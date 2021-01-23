const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');

const router = express.Router();
const { protectedRoute } = require('../middleware/auth');

router
  .route('/')
  .get(protectedRoute, getAllPosts)
  .post(protectedRoute, createPost);

router
  .route('/:id')
  .get(protectedRoute, getPostById)
  .put(protectedRoute, updatePost)
  .delete(protectedRoute, deletePost);

module.exports = router;
