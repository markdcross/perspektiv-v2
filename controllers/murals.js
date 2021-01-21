const ErrorResponse = require('../utils/ErrorResponse');
const Mural = require('../models/Mural');
const asyncHandler = require('../middleware/async');

//* ======================================
//*   @route    GET /api/v1/murals
//!   @desc     Get All Murals
//*   @access   Public
//* ======================================
exports.getMurals = asyncHandler(async (req, res, next) => {
  const murals = await Mural.find();

  res.status(200).json({ success: true, count: murals.length, data: murals });
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
  const mural = await Mural.findByIdAndDelete(req.params.id);

  if (!mural) {
    return next(
      new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
