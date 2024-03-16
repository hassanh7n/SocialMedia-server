const express = require('express');
const router = express.Router();


const {
    register,
    login,
    uploadImage
} = require('../controllers/auth');
const { route } = require('express/lib/router');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/uploadImage').post(uploadImage);



module.exports = router;