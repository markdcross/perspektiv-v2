const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/v1/auth/registered
// @access  public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create user using the schema we created
  const user = await User.create({ name, email, password, role });

  res.status(200).json({ success: true });
});
