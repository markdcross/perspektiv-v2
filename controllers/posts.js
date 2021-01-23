const ErrorResponse = require('../utils/errorResponse');
const Post = require('../models/Post');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/posts
//*   @route    GET /api/v1/murals/:muralId/posts
//!   @desc     Get Posts
//*   @access   Private
//* ======================================
exports.getPosts = asyncHandler(async (req, res, next) => {
  // grab all posts and sort by the newest first
  let query;

  if (req.params.muralId) {
    query = Post.find({ mural: req.params.muralId });
  } else {
    query = Post.find().populate({
      path: 'mural',
      select: 'name location artist'
    });
  }

  const posts = await query;

  res.status(200).json({ success: true, count: posts.length, data: posts });
});

//* ======================================
//*   @route    GET /api/v1/posts/:id
//!   @desc     Get All Posts by a specific ID
//*   @access   Private
//* ======================================
exports.getPostById = asyncHandler(async (req, res, next) => {
  // grab the specific post by passing in the request parameter
  const post = await Post.findById(req.params.id);
  // if there is no post with that ID, then return a 404 error
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    POST /api/v1/posts
//!   @desc     Create a new Post
//*   @access   Private
//* ======================================
exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    success: true,
    data: post
  });
});

//* ======================================
//*   @route    PUT /api/v1/posts/:id
//!   @desc     Update Post
//*   @access   Private
//* ======================================
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    DELETE /api/v1/posts/:id
//!   @desc     Delete Post
//*   @access   Private
//* ======================================
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
