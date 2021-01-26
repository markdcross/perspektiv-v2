const ErrorResponse = require('../utils/errorResponse');
const Mural = require('../models/Mural');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/murals
//!   @desc     Get All Murals
//*   @access   Public
//* ======================================
exports.getMurals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  // Add user to req.body
  req.body.user = req.user.id;

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
  let mural = await Mural.findByIdAndUpdate(req.params.id);

  if (!mural) {
    return next(
      new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is mural owner
  if (mural.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this mural`,
        401
      )
    );
  }

  mural = await Mural.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

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

  // Make sure user is mural owner
  if (mural.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this mural`,
        401
      )
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
