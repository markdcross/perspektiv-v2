const crypto = require('crypto');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

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
    enum: ['user', 'artist', 'restaurant'],
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
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // we'll use this later in routes/api/users.js to pull in the avatar from the user's email address
  avatar: {
    type: String
  },
  // use the following to show how many murals the user has visited
  muralsVisited: [
    {
      mural: {
        type: Schema.Types.ObjectId,
        ref: 'murals',
        required: true
      },
      date: {
        type: Date
      }
    }
  ],
  // generic schema for mongodb
  date: {
    type: Date,
    default: Date.now
  }
});

// ======================
// Securely store password
// ======================
// before the user is saved to the db, we need to encrpty the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  // create the salt that the plain password will run through for hashing
  // the higher the number, the more secure (and the more resources used; 10 is recommended)
  const salt = await bcrypt.genSalt(10);
  // using bcrypt and the salt, hash this.password and set it to the hashed value
  this.password = await bcrypt.hash(this.password, salt);
});

// ======================
// Custom methods
// ======================
// create the jwt sign method that we can call from within our controller
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};
// match user entered password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // compare the entered password with the securely stored password in the db
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// ======================
// Export
// ======================
module.exports = User = mongoose.model('User', UserSchema);
