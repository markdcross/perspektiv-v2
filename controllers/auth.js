const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const gravatar = require('gravatar');

// @desc    Register a new user
// @route   POST /api/v1/auth/registered
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

  // create token using method defined in the User model
  // since this is called on the user object, it will have access to the user id for the payload
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
