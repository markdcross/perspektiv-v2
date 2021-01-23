const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts');

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
