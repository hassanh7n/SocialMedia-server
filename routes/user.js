const express = require('express');
const router = express.Router();
const {
    getUser,
    getUserFriends,
    addRemoveFriends,
    getAllUsers
} = require('../controllers/User');
router.route('/:id').get(getUser);
router.route('/:id/friends').get(getUserFriends);
router.route('/:id/:friendId').patch(addRemoveFriends);
router.route('/').get(getAllUsers);

module.exports =  router;