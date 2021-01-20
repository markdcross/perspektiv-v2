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

  // "status" could be used like how you can set a status on slack
  status: {
    type: String,
    required: true
  },

  // use the following to show how many murals the user has visited
  murals: [
    {
      name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mural',
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
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

  // generic schema for mongodb
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
