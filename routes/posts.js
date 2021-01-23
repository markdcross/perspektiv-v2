const express = require('express');
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');

const router = express.Router({ mergeParams: true });
const { protectedRoute } = require('../middleware/auth');

router
  .route('/')
  .get(protectedRoute, getPosts)
  .post(protectedRoute, createPost);

router
  .route('/:id')
  .get(protectedRoute, getPostById)
  .put(protectedRoute, updatePost)
  .delete(protectedRoute, deletePost);

module.exports = router;
