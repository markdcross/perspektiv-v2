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

router
  .route('/')
  .get(getRestaurants)
  .post(protectedRoute, authorize('restaurant', 'admin'), createRestaurant);

router
  .route('/:id')
  .get(getRestaurant)
  .put(protectedRoute, authorize('restaurant', 'admin'), updateRestaurant)
  .delete(protectedRoute, authorize('restaurant', 'admin'), deleteRestaurant);

module.exports = router;
