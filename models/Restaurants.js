const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  // basic information regarding the restaurant
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },

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

  // location information about the restaurant
  location: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    }
  }
});

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);
