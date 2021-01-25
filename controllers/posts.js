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

      // TODO Select what Mural data is being provided here
      select: 'name location artist'
    });
  }

  const posts = await query;

  res.status(200).json({ success: true, count: posts.length, data: posts });
});

//* ======================================
//*   @route    GET /api/v1/posts/:id
//!   @desc     Get single post
//*   @access   Private
//* ======================================
exports.getPost = asyncHandler(async (req, res, next) => {
  // grab the specific post by passing in the request parameter
  const post = await Post.findById(req.params.id).populate({
    path: 'mural',
    select: 'name address'
  });
  // if there is no post with that ID, then return a 404 error
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    POST /api/v1/murals/:muralId/posts
//!   @desc     Create a new Post
//*   @access   Private
//* ======================================
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.mural = req.params.muralId;

  const mural = await Mural.findById(req.params.muralId);

  if (!mural) {
    return next(
      new Error(`No mural with the id of ${req.params.muralId}`),
      404
    );
  }

  const post = await Post.create(req.body);

  res.status(200).json({
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
