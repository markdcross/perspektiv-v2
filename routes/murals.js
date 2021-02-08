const express = require('express');
const {
  getMurals,
  getMural,
  createMural,
  updateMural,
  deleteMural,
  getMuralsInRadius,
  visitMural,
  unvisitMural,
  getDirections
} = require('../controllers/murals');

const Mural = require('../models/Mural');

// Include other resource routers
const postRouter = require('./mural-posts');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protectedRoute, authorize } = require('../middleware/auth');

router.use('/:muralId/posts', postRouter);

router.route('/radius/:zipcode/:distance').get(getMuralsInRadius);

router
  .route('/')
  .get(advancedResults(Mural, 'posts'), getMurals)
  .post(protectedRoute, authorize('artist', 'admin'), createMural);

router
  .route('/:id')
  .get(getMural)
  .put(protectedRoute, authorize('artist', 'admin'), updateMural)
  .delete(protectedRoute, authorize('artist', 'admin'), deleteMural);

router.route('/visit/:muralId/:userId').put(protectedRoute, visitMural);
router.route('/unvisit/:muralId/:userId').put(protectedRoute, unvisitMural);

module.exports = router;
