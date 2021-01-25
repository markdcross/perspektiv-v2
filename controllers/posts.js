const path = require('path');

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
  if (req.params.muralId) {
    const posts = await Post.find({ mural: req.params.muralId });

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } else {
    res.status(200).json(res.advancedResults);
  }
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
      new ErrorResponse(`No mural with the id of ${req.params.muralId}`),
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
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // check on the user to make sure it is the logged on user's post
  // user's should only be able to delete their own posts
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    DELETE /api/v1/posts/:id
//!   @desc     Delete Post
//*   @access   Private
//* ======================================
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // check on the user to make sure it is the logged on user's post
  // user's should only be able to delete their own posts
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  await post.remove();

  res.status(200).json({ success: true, data: {} });
});

//* ======================================
//*   @route    PUT /api/v1/posts/:id/photo
//!   @desc     Upload photo for post
//*   @access   Private
//* ======================================
exports.postPhotoUpload = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // check on the user to make sure it is the logged on user's post
  // user's should only be able to delete their own posts
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${post._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Post.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});