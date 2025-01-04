const express = require('express');
const router = express.Router();



const {postMessage, getAllUsers, getCoversation} = require('../controllers/Message');



router.route('/').post(postMessage);
router.route('/:Id').get(getAllUsers);
router.route('/conversation').post(getCoversation);
module.exports = router;