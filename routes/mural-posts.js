const express = require('express');
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
  .post(createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
