const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },

  // ensure that users are using unique email addresses to signup
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
      'Please add a valid email address.'
    ]
  },

  // establishing the role-based access strategy
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },

  // user password schema
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: 6,
    // select false prevents the user api call from returning the user's password as part of the returned json
    select: false
  },
  resetPasswordToken: { String },
  resetPasswordExpire: { Date },

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

// before the user is saved to the db, we need to encrpty the password
UserSchema.pre('save', async function (next) {
  // create the salt that the plain password will run through for hashing
  // the higher the number, the more secure (and the more resources used; 10 is recommended)
  const salt = await bcrypt.genSalt(10);
  // using bcrypt and the salt, hash this.password and set it to the hashed value
  this.password = await bcrypt.hash(this.password, salt);
});

// create the jwt sign method that we can call from within our controller
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports = User = mongoose.model('User', UserSchema);
