if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const fs                 = require('fs')
const https              = require('https');
const path               = require('path');
const mongoose           = require('mongoose');
const methodOverride     = require('method-override');

const express            = require('express');
const session            = require('express-session');
const MongoDBStore       = require ('connect-mongo');
const mongoSanitize      = require('express-mongo-sanitize');
const helmet             = require('helmet');
const ejsMate            = require('ejs-mate');

const flash              = require('connect-flash');  
const passport           = require('passport');
const LocalStrategy      = require('passport-local');
const User               = require('./models/user');
const cookieParser       = require('cookie-parser');

const ExpressError       = require('./utils/ExpressError');

const campgroundRoutes   = require('./routes/campgrounds');
const reviewsRoutes      = require('./routes/reviews');
const userRoutes         = require('./routes/users');
const MongoStore = require('connect-mongo');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./certificate.pem');

const app = express();

const server = https.createServer({key: key, cert: cert }, app);

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = new MongoDBStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 3600 // time period in seconds.
});

store.on('error', function (e) {
    console.log('Session Store Error: ', e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true, // cookies can only be used over https connections.
        expires:  Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:   1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://cdn.jsdelivr.net/",
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["blob:", ...scriptSrcUrls, ...styleSrcUrls, ...connectSrcUrls],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls, ...styleSrcUrls, ...connectSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls, ...styleSrcUrls, ...connectSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: ["blob:", ...scriptSrcUrls, ...styleSrcUrls, ...connectSrcUrls],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dguk8rvgh/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(mongoSanitize({replaceWith:'_'}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes );

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'something went wrong' } = err;
    if(!err.message) err.message = 'Something went wrong.'
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 80;

server.listen(port, () => {
    console.log(`Serving on port ${ port }`);
});