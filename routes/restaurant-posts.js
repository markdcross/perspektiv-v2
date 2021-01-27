const express = require('express');
// methods
const {
  protectedRoutegetPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postPhotoUpload
} = require('../controllers/restaurant-posts');
// model
const RestaurantPost = require('../models/RestaurantPost');
// router
const router = express.Router({ mergeParams: true });
// middleware
const advancedResults = require('../middleware/advancedResults');
const { protectedRoute } = require('../middleware/auth');

// all post routes are protected
router.use(protectedRoute);

router.route('/:id/photo').put(postPhotoUpload);

router
  .route('/')
  .get(
    advancedResults(RestaurantPost, {
      path: 'restaurant',
      select: 'name location category rating'
    }),
    getPosts
  )
  .post(createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
