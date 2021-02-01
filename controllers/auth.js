const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const gravatar = require('gravatar');

//* ===============================================================
//* @route   POST /api/v1/auth/register
//! @desc    Register a new user
//* @access  public
//* ===============================================================
exports.register = asyncHandler(async (req, res, next) => {
  // get the request body
  const { name, email, password, role } = req.body;

  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('User already exists.', 400));
  }

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

//* ===============================================================
//* @desc    Login user
//! @route   POST /api/v1/auth/login
//* @access  public
//* ===============================================================
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

//* ===============================================================
//* @route   GET /api/v1/auth/logout
//! @desc    Log user out and clear cookies
//* @access  private
//* ===============================================================
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ success: true, data: {} });
});

//* ===============================================================
//* @route   GET /api/v1/auth/me
//! @desc    Get current logged in user
//* @access  private
//* ===============================================================
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

//* ===============================================================
//*   @route    PUT /api/v1/auth/updatedetails
//!   @desc     Update user details
//*   @access   Private
//* ===============================================================
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

//* ===============================================================
//*   @route    PUT /api/v1/auth/updatepassword
//!   @desc     Update password
//*   @access   Private
//* ===============================================================
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

//* ===============================================================
//*   @route    POST /api/v1/auth/forgotpassword
//!   @desc     Forgot Password
//*   @access   Public
//* ===============================================================
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset link',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

//* ===============================================================
//*   @route    PUT /api/v1/auth/resetpassword/:resettoken
//!   @desc     Reset password
//*   @access   Public
//* ===============================================================
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPassswordToken = undefined;
  user.resetPassswordExpire = undefined;
  await user.save();

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
    .json({ token });
};
