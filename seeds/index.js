const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected");
});

const images = [{
                    url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664456165/YelpCamp/nyadltnxy47jgra3h55y.jpg',
                    filename: 'YelpCamp/nyadltnxy47jgra3h55y'
                },
                {
                    url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664456168/YelpCamp/cjedbnhc8osrbsa8othk.jpg',
                    filename: 'YelpCamp/cjedbnhc8osrbsa8othk'
                },
                {
                    url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664456170/YelpCamp/ypthm0frkldqblb9k07x.jpg',
                    filename: 'YelpCamp/ypthm0frkldqblb9k07x'
                },
                {
                    url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664456172/YelpCamp/imoe22ualy4yqevj8up6.jpg',
                    filename: 'YelpCamp/imoe22ualy4yqevj8up6'
                },
                {
                    url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664456176/YelpCamp/fl9gtn1dvwqrjsa5fq52.jpg',
                  filename: 'YelpCamp/fl9gtn1dvwqrjsa5fq52'
                }];

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '633301b2a30b1389e4fbc2f6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo sunt ipsum fugit quo. Reiciendis corrupti nemo omnis cumque ex, recusandae provident, ab cupiditate voluptates, quibusdam quidem dolor officia? Repudiandae, voluptates.',
            price: price,
            images: images[Math.floor(Math.random()*5)],
            geometry: { type: 'Point', coordinates: [ Math.random() * -2 - 6.103721, Math.random()  * 2 + 53.295386 ] }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})