const express = require('express');
const router = express.Router();

const {
    createPost,
    getUsersPosts,
    feedPost,
    updatePost
} =
require('../controllers/Post');

router.route('/').post(createPost);
router.route('/').get(feedPost)
router.route('/:id').get(getUsersPosts);
router.route('/:id/update').patch(updatePost);


module.exports =  router