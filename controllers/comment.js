const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');






const createComment = async(req, res) => {
    const {userId , postId, comment} = req.body;
    console.log(userId, postId, comment)
            const user = await User.findById({_id : userId});
          const post = await Post.findById({_id : postId});
            post.comments.push({
                comment : comment,
                bioPic : user.picture,
                userId : user._id,
                postId : postId,
                name : user.firstName + " " + user.lastName
            })
            await post.save();
        //   const updatedPost = await Post.findByIdAndUpdate(
        //     postId,
        //     { comment : post.comments },
        //     { new: true }
        //   );
      
        //   res.status(200).json(post);
        

    // const user = await User.findById({_id : userId});
    // console.log(user);

    
    // const commentCreate = await Comment.create({
    //     comment : comment,
    //     name : user.firstName + " " + user.lastName,
    //     bioPic : user.picture,
    //     userId : userId,
    //     postId : postId
    // })
    
    // const post = await Post.findById({_id : postId});
    const result = post.comments.reverse()
    
    res.status(StatusCodes.CREATED).json({
        comment : result
    })
}


const getAllComments = async(req, res) =>{
    const {id} = req.body;
    console.log(id);
    

    const findComments = await Comment.find({postId : id});
    console.log(findComments);


    res.status(StatusCodes.OK).json({
        comments : findComments
    })
    
}



module.exports = {
    createComment,
    getAllComments
}