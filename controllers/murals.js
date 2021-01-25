const ErrorResponse = require('../utils/errorResponse');
const Mural = require('../models/Mural');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/murals
//!   @desc     Get All Murals
//*   @access   Public
//* ======================================
exports.getMurals = asyncHandler(async (req, res, next) => {
  // Add filtering to the get all router
  // ALlows you to add a query parameter
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Mural.find(JSON.parse(queryStr)).populate('posts');

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Mural.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const murals = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: murals.length,
    pagination,
    data: murals
  });
});

//* ======================================
//*   @route    GET /api/v1/murals/:id
//!   @desc     Get single Mural
//*   @access   Public
//* ======================================
exports.getMural = asyncHandler(async (req, res, next) => {
  const mural = await Mural.findById(req.params.id);

  if (!mural) {
    return next(
      new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: mural });
});

//* ======================================
//*   @route    POST /api/v1/murals
//!   @desc     Create new Mural
//*   @access   Private
//* ======================================
exports.createMural = asyncHandler(async (req, res, next) => {
  const mural = await Mural.create(req.body);
  res.status(201).json({
    success: true,
    data: mural
  });
});

//* ======================================
//*   @route    PUT /api/v1/murals/:id
//!   @desc     Update Mural
//*   @access   Private
//* ======================================
exports.updateMural = asyncHandler(async (req, res, next) => {
  const mural = await Mural.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!mural) {
    return next(
      new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: mural });
});

//* ======================================
//*   @route    DELETE /api/v1/murals/:id
//!   @desc     Delete Mural
//*   @access   Private
//* ======================================
exports.deleteMural = asyncHandler(async (req, res, next) => {
  const mural = await Mural.findById(req.params.id);

  if (!mural) {
    return next(
      new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404)
    );
  }

  mural.remove();

  res.status(200).json({ success: true, data: {} });
});

//* ======================================
//*   @route    GET /api/v1/murals/radius/:zipcode/:distance (This can take a /:units as well)
//!   @desc     Get murals within a radius
//*   @access   Private
//* ======================================
// You can use lat/lng here instead of zipcode and you don't have to use the geocoder
exports.getMuralsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3963 mi, 6378 kilometers
  // Below is by half-mile
  const radius = distance / 7926;

  const murals = await Mural.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({ success: true, count: murals.length, data: murals });
});
