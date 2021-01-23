const express = require('express');
const {
  getMurals,
  getMural,
  createMural,
  updateMural,
  deleteMural,
  getMuralsInRadius
} = require('../controllers/murals');

const router = express.Router();
const { protectedRoute } = require('../middleware/auth');

router.route('/radius/:zipcode/:distance').get(getMuralsInRadius);

router.route('/').get(getMurals).post(protectedRoute, createMural);

router
  .route('/:id')
  .get(getMural)
  .put(protectedRoute, updateMural)
  .delete(protectedRoute, deleteMural);

module.exports = router;
