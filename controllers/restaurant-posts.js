const path = require('path');

const ErrorResponse = require('../utils/errorResponse');
const RestaurantPost = require('../models/RestaurantPost');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/restaurants/:restaurantId/posts
//!   @desc     Get Posts for a specific restaurant
//*   @access   Private
//* ======================================
exports.getPosts = asyncHandler(async (req, res, next) => {
  if (req.params.restaurantId) {
    const posts = await RestaurantPost.find({
      restaurant: req.params.restaurantId
    });

    res.status(200).json({ success: true, count: posts.length, data: posts });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//* ======================================
//*   @route    GET /api/v1/restaurant-posts/:id
//!   @desc     Get single post
//*   @access   Private
//* ======================================
exports.getPost = asyncHandler(async (req, res, next) => {
  // grab the specific post by passing in the req parameter
  const post = await RestaurantPost.findById(req.params.id).populate({
    path: 'restaurant',
    select: 'name address'
  });
  // if there is no post with that ID, then return a 404 error
  if (!post) {
    return next(
      new ErrorResponse(`Post not found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    POST /api/v1/restaurants/:restaurantId/posts
//!   @desc     Create a new Post
//*   @access   Private
//* ======================================
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.restaurant = req.params.restaurandId;
  req.body.user = req.user.id;

  const restaurant = await Restaurant.findById(req.params.restaurandId);

  if (!restaurant) {
    return next(
      new ErrorResponse(`No restaurant with the id of ${req.params.id}`, 404)
    );
  }

  const post = await RestaurantPost.create(req.body);

  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    PUT /api/v1/restaurant-posts/:id
//!   @desc     Update Post
//*   @access   Private
//* ======================================
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await RestaurantPost.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with the id of ${req.params.id}`, 404)
    );
  }

  // make sure the user is the owner of the post
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this post`,
        401
      )
    );
  }

  post = await RestaurantPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: post });
});

//* ======================================
//*   @route    DELETE /api/v1/restaurant-posts/:id
//!   @desc     Delete Post
//*   @access   Private
//* ======================================
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await RestaurantPost.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure user is post owner
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this post`,
        401
      )
    );
  }

  await post.remove();

  res.status(200).json({ success: true, data: {} });
});

//* ======================================
//*   @route    PUT /api/v1/restaurant-posts/:id/photo
//!   @desc     Upload photo for post
//*   @access   Private
//* ======================================
exports.postPhotoUpload = asyncHandler(async (req, res, next) => {
  const post = await RestaurantPost.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // make sure the user is post owner or an admin
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this post`,
        401
      )
    );
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

    await RestaurantPost.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
