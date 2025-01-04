const express = require('express');
const router = express.Router();


const {createConversation,
    getConvOfUser,
    getConvOfTwoUsers} = require('../controllers/Conversation');

router.route('/').post(createConversation);
router.route('/:userId').get(getConvOfUser);
router.route('/find/:firstUserId/:secondUserId').get(getConvOfTwoUsers);


module.exports = router