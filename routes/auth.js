const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  logout
} = require('../controllers/auth');

const router = express.Router();
const { protectedRoute } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectedRoute, getMe);
router.post('/forgotpassword', forgotPassword);
router.get('/logout', protectedRoute, logout);

module.exports = router;
