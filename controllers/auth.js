const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const gravatar = require('gravatar');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  public
exports.register = asyncHandler(async (req, res, next) => {
  // get the request body
  const { name, email, password, role } = req.body;
  // get users gravatar based on email address used to register
  const avatar = gravatar.url(email, {
    // set the size for the gravatar
    s: '200',
    // set the rating of the returned media
    r: 'pg',
    // set the default gravatat in case the user doesnt have one
    d: 'mm'
  });
  // create user using the schema we created
  const user = await User.create({ name, email, password, role, avatar });
  // create and store the token in cookies using the sendTokenResponse() helper function
  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  public
exports.login = asyncHandler(async (req, res, next) => {
  // get the request body
  const { email, password } = req.body;
  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  // check for the user and include the password in the response so that we can validate for login
  // we set select to a default value of false in the Schema which is why we need to pull it back in here
  const user = await User.findOne({ email }).select('+password');
  // if user doesnt exist, then send error
  if (!user) {
    return next(new ErrorResponse('Invalid credentials. Access denied.', 401));
  }
  // check if the password matches
  const isMatch = await user.matchPassword(password);
  // if the passwords do not match, then send an error message
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials. Access denied.', 401));
  }
  // create and store the token in cookies using the sendTokenResponse() helper function
  sendTokenResponse(user, 200, res);
});

// get token from model, create cookie to store it in, and send a response
const sendTokenResponse = (user, statusCode, res) => {
  // create token using method defined in the User model
  // since this is called on the user object, it will have access to the user id for the payload
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    // send a response with the status code
    .status(statusCode)
    // then store the token as "token" in cookies (along with options)
    .cookie('token', token, options)
    // then send a success message with the token
    .json({ success: true, token });
};

//* ======================================
//* @route   POST /api/v1/auth/me
//! @desc    Get current logged in user
//* @access  private
//* ======================================
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});
