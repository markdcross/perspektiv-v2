const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// protect routes
exports.protectedRoute = asyncHandler(async (req, res, next) => {
  let token;
  // check if the headers have an authorization token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // check if the cookies have an authorization token
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // if there is no token, then the user fails the verification and is unauthorized
  if (!token) {
    return next(
      new ErrorResponse('User is not authorized to access this content', 401)
    );
  }

  try {
    // verify token using out jwt secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // find the user in the database that matches that id
    req.user = await User.findById(decoded.id);
    // let them through to the protected route
    next();
  } catch (err) {
    return next(
      new ErrorResponse('User is not authorized to access this content', 401)
    );
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
