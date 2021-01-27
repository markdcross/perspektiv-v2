const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout
} = require('../controllers/auth');

const router = express.Router();
const { protectedRoute } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectedRoute, getMe);
router.put('/updatedetails', protectedRoute, updateDetails);
router.put('/updatepassword', protectedRoute, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/logout', protectedRoute, logout);

module.exports = router;
