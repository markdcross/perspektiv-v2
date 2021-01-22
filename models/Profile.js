const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  // general user information to display on the profile
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },

  // level that they've earned on Perspektiv (Wanderer to Patron to ... etc)
  badge: {
    type: String,
    default: 'Wanderer'
  },

  // use the following to show how many murals the user has visited
  murals: [
    {
      name: {
        type: Schema.Types.ObjectId,
        ref: 'murals',
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ],

  // use the following to show how many restaurants the user has visited
  restaurants: [
    {
      name: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ],

  // showcase social icons on the user's profile
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    website: {
      type: String
    }
  },

  // generic schema for mongodb models
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
