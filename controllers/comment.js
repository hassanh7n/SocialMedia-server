const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');






const createComment = async(req, res) => {
    const {userId , postId, comment} = req.body;

    const user = await User.findById({_id : userId});
    console.log(user);

    const post = await Post.findById({_id : postId});


    const comm = await Comment.create({
        comment : comment,
        name : user.firstName + user.lastName,
        bioPic : user.picture,
        userId,
        postId
    })

    await comm.save();

    res.status(StatusCodes.CREATED).json({
        comm
    })
}




module.exports = {
    createComment,
}