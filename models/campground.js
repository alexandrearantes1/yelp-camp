const mongoose = require('mongoose');
const Review = require('./review');
const Schema   = mongoose.Schema;

// https://res.cloudinary.com/dguk8rvgh/image/upload/v1664456165/YelpCamp/nyadltnxy47jgra3h55y.jpg
// https://res.cloudinary.com/demo/image/upload/ar_1.0,c_fill,g_north_west,w_250/docs/models.jpg
const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/ar_1.0,c_fill,g_south,w_250,h_170');
});

ImageSchema.virtual('large_thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/ar_1.0,c_fill,g_center,w_516,h_311');
});

ImageSchema.virtual('carousel_image').get(function () {
    return this.url.replace('/upload', '/upload/ar_1.0,c_fill,g_center,w_636,h_477');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: Number,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    let thumbnail = '';
    if( this.images[0] ) 
        thumbnail = this.images[0]['thumbnail'];
    return `
    <div class="row">
        <div class="col-6 pe-0">
            <figure class="figure">
                <img src="${thumbnail}" class="figure-img img-fluid rounded" alt="...">
            </figure>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-body">            
                    <h5 class="mapPopUp card-title"><a href="/campgrounds/${this._id}">${this.title}</a></h5>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item text-muted">${this.location}</li>
                <li class="list-group-item">&euro;${this.price.toFixed(2)} / night</li>
                </ul>
            </div>
        </div>
    </div>
    `;
});


CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

CampgroundSchema.methods.calculateRating = async function () {
    if(this.reviews.length) {
        let sum = 0;
        for (let reviewId of this.reviews) {
            const review = await Review.findById(reviewId);
            sum += review.rating;
        }
        return sum / this.reviews.length;
    }
};

module.exports = mongoose.model('Campground', CampgroundSchema);
