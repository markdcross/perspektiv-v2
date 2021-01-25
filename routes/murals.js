const express = require('express');
const {
  getMurals,
  getMural,
  createMural,
  updateMural,
  deleteMural,
  getMuralsInRadius
} = require('../controllers/murals');

const Mural = require('../models/Mural');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const postRouter = require('./posts');

const router = express.Router();

const { protectedRoute } = require('../middleware/auth');

router.use('/:muralId/posts', postRouter);

router.route('/radius/:zipcode/:distance').get(getMuralsInRadius);

router
  .route('/')
  .get(advancedResults(Mural, 'posts'), getMurals)
  .post(protectedRoute, createMural);

router
  .route('/:id')
  .get(getMural)
  .put(protectedRoute, updateMural)
  .delete(protectedRoute, deleteMural);

module.exports = router;
