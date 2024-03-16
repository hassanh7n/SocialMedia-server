const express = require('express');
const router = express.Router();

const {
    createPost,
    uploadImage,
    getUsersPosts,
    feedPost,
    updatePost
} =
require('../controllers/Post');

router.route('/').post(createPost);
router.route('/').get(feedPost)
router.route('/uploadImage').post(uploadImage);
router.route('/:id').get(getUsersPosts);
router.route('/:id/update').patch(updatePost);


module.exports =  router