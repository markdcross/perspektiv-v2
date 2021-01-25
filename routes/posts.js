const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postPhotoUpload
} = require('../controllers/posts');

const router = express.Router({ mergeParams: true });
const { protectedRoute } = require('../middleware/auth');

router.route('/:id/photo').put(postPhotoUpload);

router
  .route('/')
  .get(protectedRoute, getPosts)
  .post(protectedRoute, createPost);

router
  .route('/:id')
  .get(protectedRoute, getPost)
  .put(protectedRoute, updatePost)
  .delete(protectedRoute, deletePost);

module.exports = router;
