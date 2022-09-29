const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    console.log(`router.get('/register'): ${req.session.id}`)
    console.log(`req.session.returnTo - /register - get: ${req.session.returnTo}`)
    res.render('users/register');
}

module.exports.createUser = async (req, res, next) => {
    console.log(`router.post('/register'): ${req.session.id}`)
    
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to Yelp Camp, ${username}`);
            const url = req.session.returnTo || '/campgrounds';
            res.redirect(url);
        });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }    
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'welcome back');
    const redirectUrl = req.cookies.returnTo || '/campgrounds'
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}