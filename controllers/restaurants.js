const ErrorResponse = require('../utils/ErrorResponse');
const Restaurant = require('../models/Restaurant');

//* ======================================
//*   @route    GET /api/v1/restaurants
//!   @desc     Get All Restaurants
//*   @access   Public
//* ======================================
exports.getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();

    res
      .status(200)
      .json({ success: true, count: restaurants.length, data: restaurants });
  } catch (err) {
    next(err);
  }
};

//* ======================================
//*   @route    GET /api/v1/restaurants/:id
//!   @desc     Get single Restaurant
//*   @access   Public
//* ======================================
exports.getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(
        new ErrorResponse(
          `Restaurant not found with id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (err) {
    next(err);
  }
};

//* ======================================
//*   @route    POST /api/v1/restaurants
//!   @desc     Create new Restaurant
//*   @access   Private
//* ======================================
exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      success: true,
      data: restaurant
    });
  } catch (err) {
    next(err);
  }
};

//* ======================================
//*   @route    PUT /api/v1/restaurants/:id
//!   @desc     Update Restaurant
//*   @access   Private
//* ======================================
exports.updateRestaurant = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(err);
  }
};

//* ======================================
//*   @route    DELETE /api/v1/restaurants/:id
//!   @desc     Delete Restaurant
//*   @access   Private
//* ======================================
exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(err);
  }
};
