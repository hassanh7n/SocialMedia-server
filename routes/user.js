const express = require('express');
const router = express.Router();
const {
    getUser,
    getUserFriends,
    addRemoveFriends,
    getAllUsers,
    getAllMessengersUsers
} = require('../controllers/User');
router.route('/:id').get(getUser);
router.route('/:id/friends').get(getUserFriends);
router.route('/:id/:friendId').patch(addRemoveFriends);
router.route('/').get(getAllUsers);
router.route('/users/:id').get(getAllMessengersUsers);
router.route('/:id').get(getAllUsers);


module.exports =  router;