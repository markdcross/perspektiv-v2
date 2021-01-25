const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  // basic information regarding the restaurant
  name: {
    type: String,
    required: true
  },
  slug: String,
  description: {
    type: String
  },
  category: {
    type: [String]
  },
  image: String,
  rating: Number,
  price: String,
  // contact information
  contact: {
    phone: {
      type: String
    },
    email: {
      type: String
    },
    website: {
      type: String
    }
  },
  id: String,
  category: String,
  // store hours
  hours: {
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    // is the restaurant currently open?
    current: {
      type: Boolean,
      default: false
    }
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  // location information about the restaurant
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  }
});

// Create restaurant slug from the name
RestaurantSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
RestaurantSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  next();
});

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);
