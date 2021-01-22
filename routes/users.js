const express = require('express');
const router = express.Router();
// bring in the core npm packages for user registration
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
// import the database models
const User = require('../models/User');

router.post(
  '/',
  // begin express-validator checks
  [
    // check to make sure the name is entered
    check('name', 'Name is required').not().isEmpty(),
    // check to make sure the email is entered and vaild
    check('email', 'Please include a valid email').isEmail(),
    // check to make sure the password is the proper length
    check(
      'password',
      'Please enter a password that is at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // set the errors object based on the validation results
    const errors = validationResult(req);
    // if there ARE errors, then return a bad equest along with the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the name, email and password variables from the request body
    const { name, email, password } = req.body;

    // once checks are passed, try registering the user
    try {
      // reach out to the database, and see if the email exists already
      let user = await User.findOne({ email });
      // if the user tries to signup with an email that already is in the db, throw an error
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // get users gravatar based on email address used to register
      const avatar = gravatar.url(email, {
        // set the size for the gravata
        s: '200',
        // set the rating of the returned media
        r: 'pg',
        // set the default gravatat in case the user doesnt have one
        d: 'mm'
      });
      // create a new instance of the user (it is NOT saved to the db yet)
      user = new User({ name, email, avatar, password });
      // create the salt that the plain password will run through for hashing
      const salt = await bcrypt.genSalt(10);
      // using bcrypt and the salt, hash the password and set it to the user password value
      user.password = await bcrypt.hash(password, salt);
      // save the user to the database with their hashed password
      await user.save();

      // create the payload object
      const payload = {
        user: {
          id: user.id
        }
      };

      // create a json web token for new users
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // if an error results, then it will be caught and handled here
      console.log(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
