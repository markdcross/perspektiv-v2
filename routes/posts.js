const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postPhotoUpload
} = require('../controllers/posts');

const Post = require('../models/Post');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });
const { protectedRoute } = require('../middleware/auth');

router.route('/:id/photo').put(protectedRoute, postPhotoUpload);

router
  .route('/')
  .get(
    protectedRoute,
    advancedResults(Post, {
      path: 'mural',
      // TODO Select what Mural data is being provided here
      select: 'name location artist'
    }),
    getPosts
  )
  .post(protectedRoute, createPost);

router
  .route('/:id')
  .get(protectedRoute, getPost)
  .put(protectedRoute, updatePost)
  .delete(protectedRoute, deletePost);

module.exports = router;
