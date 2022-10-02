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
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565469/YelpCamp/p6b99n5mrz2qfysol6ez.jpg',
                  filename: 'YelpCamp/p6b99n5mrz2qfysol6ez'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565477/YelpCamp/dsidvfyeiru5ehlzql6x.jpg',
                  filename: 'YelpCamp/dsidvfyeiru5ehlzql6x'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565478/YelpCamp/mjp6im5kwjezm1n67jhv.jpg',
                  filename: 'YelpCamp/mjp6im5kwjezm1n67jhv'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565483/YelpCamp/qtr73q687pqe5g9v0xdw.jpg',
                  filename: 'YelpCamp/qtr73q687pqe5g9v0xdw'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565484/YelpCamp/nmd9n5pipg3pgk5a9csi.jpg',
                  filename: 'YelpCamp/nmd9n5pipg3pgk5a9csi'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565488/YelpCamp/v5jmezvb32nb9rfm7iao.jpg',
                  filename: 'YelpCamp/v5jmezvb32nb9rfm7iao'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565489/YelpCamp/x9wagalwfmobk3itbbqq.jpg',
                  filename: 'YelpCamp/x9wagalwfmobk3itbbqq'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565499/YelpCamp/yli3l8rs6gxrqntdcgmw.jpg',
                  filename: 'YelpCamp/yli3l8rs6gxrqntdcgmw'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565500/YelpCamp/c6hl1pbes4nzuz3oos6i.jpg',
                  filename: 'YelpCamp/c6hl1pbes4nzuz3oos6i'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565502/YelpCamp/pfoqvcdedjj8thcnkhtr.jpg',
                  filename: 'YelpCamp/pfoqvcdedjj8thcnkhtr'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565503/YelpCamp/gfq4kf7bnivgwu82jgks.jpg',
                  filename: 'YelpCamp/gfq4kf7bnivgwu82jgks'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565505/YelpCamp/muziaxk0blqhcf8bw89r.jpg',
                  filename: 'YelpCamp/muziaxk0blqhcf8bw89r'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565514/YelpCamp/l4narmirky6nwctx1y6x.jpg',
                  filename: 'YelpCamp/l4narmirky6nwctx1y6x'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565515/YelpCamp/wpg5z92jw6uf8akhsbct.jpg',
                  filename: 'YelpCamp/wpg5z92jw6uf8akhsbct'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565516/YelpCamp/fbaebhipz4rzqwfj809v.jpg',
                  filename: 'YelpCamp/fbaebhipz4rzqwfj809v'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565517/YelpCamp/w0zmwtcanap4jj6z87s6.jpg',
                  filename: 'YelpCamp/w0zmwtcanap4jj6z87s6'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565522/YelpCamp/v9kpilipsb9axnaum63h.jpg',
                  filename: 'YelpCamp/v9kpilipsb9axnaum63h'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565525/YelpCamp/rmrlarqqcgdhi8atwcv5.jpg',
                  filename: 'YelpCamp/rmrlarqqcgdhi8atwcv5'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565525/YelpCamp/f5hb7yzau938o9yffma2.jpg',
                  filename: 'YelpCamp/f5hb7yzau938o9yffma2'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565526/YelpCamp/hs1i3kxlvbjajamuiauy.jpg',
                  filename: 'YelpCamp/hs1i3kxlvbjajamuiauy'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565528/YelpCamp/gfs4hfx07su3wki3rzgm.jpg',
                  filename: 'YelpCamp/gfs4hfx07su3wki3rzgm'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565529/YelpCamp/uwcg1tm8hkagccwihgzr.jpg',
                  filename: 'YelpCamp/uwcg1tm8hkagccwihgzr'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565530/YelpCamp/suqynv4k9syqh3xi3i4z.jpg',
                  filename: 'YelpCamp/suqynv4k9syqh3xi3i4z'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565532/YelpCamp/ldccsuozt0z0eq4uwr10.jpg',
                  filename: 'YelpCamp/ldccsuozt0z0eq4uwr10'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565538/YelpCamp/vas71xdzssocwo9ug6fg.jpg',
                  filename: 'YelpCamp/vas71xdzssocwo9ug6fg'
                },
                {
                  url: 'https://res.cloudinary.com/dguk8rvgh/image/upload/v1664565548/YelpCamp/pidx0oyvsopc6y47hgso.jpg',
                  filename: 'YelpCamp/pidx0oyvsopc6y47hgso'
                }];

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const arraySize = images.length;
        const camp = new Campground({
            author: '633301b2a30b1389e4fbc2f6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo sunt ipsum fugit quo. Reiciendis corrupti nemo omnis cumque ex, recusandae provident, ab cupiditate voluptates, quibusdam quidem dolor officia? Repudiandae, voluptates.',
            price: price,
            images: images[Math.floor(Math.random() * arraySize)],
            geometry: { 
              type: 'Point', 
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
              ]}
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})