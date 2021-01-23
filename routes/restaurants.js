const express = require('express');
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurants');

const router = express.Router();
const { protectedRoute } = require('../middleware/auth');

router.route('/').get(getRestaurants).post(protectedRoute, createRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .put(protectedRoute, updateRestaurant)
  .delete(protectedRoute, deleteRestaurant);

module.exports = router;
