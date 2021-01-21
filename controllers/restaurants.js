const ErrorResponse = require('../utils/ErrorResponse');
const Restaurant = require('../models/Restaurant');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/restaurants
//!   @desc     Get All Restaurants
//*   @access   Public
//* ======================================
exports.getRestaurants = asyncHandler(async (req, res, next) => {
  const restaurants = await Restaurant.find();

  res
    .status(200)
    .json({ success: true, count: restaurants.length, data: restaurants });
});

//* ======================================
//*   @route    GET /api/v1/restaurants/:id
//!   @desc     Get single Restaurant
//*   @access   Public
//* ======================================
exports.getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorResponse(`Restaurant not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: restaurant });
});

//* ======================================
//*   @route    POST /api/v1/restaurants
//!   @desc     Create new Restaurant
//*   @access   Private
//* ======================================
exports.createRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({
    success: true,
    data: restaurant
  });
});

//* ======================================
//*   @route    PUT /api/v1/restaurants/:id
//!   @desc     Update Restaurant
//*   @access   Private
//* ======================================
exports.updateRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!restaurant) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: restaurant });
});

//* ======================================
//*   @route    DELETE /api/v1/restaurants/:id
//!   @desc     Delete Restaurant
//*   @access   Private
//* ======================================
exports.deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (!restaurant) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: {} });
});
