const express = require('express');
const router = express.Router();




const {createComment, getAllComments} = require('../controllers/comment');


router.route('/').post(createComment);
router.route('/getallcomments').post(getAllComments);

module.exports = router;