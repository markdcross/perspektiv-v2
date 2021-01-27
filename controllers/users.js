const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//* ===============================================================
//*   @route    GET /api/v1/auth/users
//!   @desc     Get all users
//*   @access   Private/Admin
//* ===============================================================
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//* ===============================================================
//*   @route    GET /api/v1/auth/users/:id
//!   @desc     Get single users
//*   @access   Private/Admin
//* ===============================================================
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

//* ===============================================================
//*   @route    POST /api/v1/auth/users
//!   @desc     Create user
//*   @access   Private/Admin
//* ===============================================================
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

//* ===============================================================
//*   @route    PUT /api/v1/auth/users/:id
//!   @desc     Update user
//*   @access   Private/Admin
//* ===============================================================
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

//* ===============================================================
//*   @route    Delete /api/v1/auth/users/:id
//!   @desc     Delete user
//*   @access   Private/Admin
//* ===============================================================
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
