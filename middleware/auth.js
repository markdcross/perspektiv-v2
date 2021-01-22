const jwt = require('jwt');
const config = require('config');

module.exports = function (req, res, next) {
  // get the token from header
  const token = req.header('x-auth-header');
  // check if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'User token is not authorized. Access denied.' });
  }
  // verify token if there is one included in the headers
  try {
    // if valid, decode the tokens
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // set req.user equal to the decoded token so we can use it in any of our protected routes
    req.user = decoded.user;
    // run the next callback
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
