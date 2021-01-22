const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  // ensure that users are using unique email addresses to signup
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // we'll use this later in routes/api/users.js to pull in the avatar from the user's email address
  // [JOSH] refer to the Traversy MERN tutorial on Udemy
  avatar: {
    type: String
  },

  // generic schema for mongodb
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('User', UserSchema);
