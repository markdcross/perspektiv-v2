const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const Schema = mongoose.Schema;

const MuralSchema = new Schema({
  // basic information regarding the mural
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  slug: String,
  description: {
    type: String
  },

  // use the following information to show how long the mural took to create
  dates: {
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    // if the mural is still being created, then we can set the current value to true
    // (only use for brand new murals that are currently being painted)
    current: {
      type: Boolean,
      default: false
    }
  },

  // use the following to showcase information about the mural's creator
  // TODO Do we need to connect this with an artist already registered with our app?
  artist: {
    name: {
      type: String
    },
    bio: {
      type: String
    },
    link: {
      type: String
    }
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  // Location of the mural
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

// Create mural slug from the name
MuralSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
MuralSchema.pre('save', async function (next) {
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

  // Do not save address in DB
  this.address = undefined;
  next();
});

module.exports = Mural = mongoose.model('mural', MuralSchema);
