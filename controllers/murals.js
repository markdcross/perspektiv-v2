const ErrorResponse = require('../utils/ErrorResponse');
const Mural = require('../models/Mural');

//* ======================================
//*   @route    GET /api/v1/murals
//!   @desc     Get All Murals
//*   @access   Public
//* ======================================
exports.getMurals = async (req, res, next) => {
  try {
    const murals = await Mural.find();

    res.status(200).json({ success: true, count: murals.length, data: murals });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//* ======================================
//*   @route    GET /api/v1/murals/:id
//!   @desc     Get single Mural
//*   @access   Public
//* ======================================
exports.getMural = async (req, res, next) => {
  try {
    const mural = await Mural.findById(req.params.id);

    if (!mural) {
      return next(
        new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: mural });
  } catch (err) {
    next(new ErrorResponse(`Mural not found with id of ${req.params.id}`, 404));
  }
};

//* ======================================
//*   @route    POST /api/v1/murals
//!   @desc     Create new Mural
//*   @access   Private
//* ======================================
exports.createMural = async (req, res, next) => {
  try {
    const mural = await Mural.create(req.body);

    res.status(201).json({
      success: true,
      data: mural
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//* ======================================
//*   @route    PUT /api/v1/murals/:id
//!   @desc     Update Mural
//*   @access   Private
//* ======================================
exports.updateMural = async (req, res, next) => {
  try {
    const mural = await Mural.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!mural) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: mural });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//* ======================================
//*   @route    DELETE /api/v1/murals/:id
//!   @desc     Delete Mural
//*   @access   Private
//* ======================================
exports.deleteMural = async (req, res, next) => {
  try {
    const mural = await Mural.findByIdAndDelete(req.params.id);

    if (!mural) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
