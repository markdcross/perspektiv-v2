const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  postPhotoUpload
} = require('../controllers/mural-posts');

const MuralPost = require('../models/MuralPost');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protectedRoute } = require('../middleware/auth');

router.use(protectedRoute);

// File uploading
const DIR = './client/build/postImages/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

var upload = multer({
  storage: storage
});

router.route('/:id/photo').put(postPhotoUpload);

router
  .route('/')
  .get(
    advancedResults(MuralPost, {
      path: 'mural',
      select: 'name location artist'
    }),
    getPosts
  )
  .post(upload.single('file'), createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
