const express = require('express');
const {
  getMurals,
  getMural,
  createMural,
  updateMural,
  deleteMural,
  getMuralsInRadius
} = require('../controllers/murals');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getMuralsInRadius);

router.route('/').get(getMurals).post(createMural);

router.route('/:id').get(getMural).put(updateMural).delete(deleteMural);

module.exports = router;
