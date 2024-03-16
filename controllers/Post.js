const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// create post
const createPost = async(req, res) => {
    const {userId, pictureUrl, description} = req.body;
    const user = await User.findOne({_id : userId});
    console.log(user);
    const post = await Post.create({
        userId,
        firstName : user.firstName,
        lastName : user.lastName,
        location : user.location,
        description,
        pictureUrl,
        likes : {},
        comments : [],
        userPictureUrl : user.picture
    })

    await post.save();


    const updatePost = await Post.find().sort('-createdAt');
    res.status(StatusCodes
        .CREATED).json({
            posts : updatePost        
        })
}

// get all posts on feed
const feedPost = async(req, res) => {
    const posts = await Post.find().sort('-createdAt');

    res.status(StatusCodes.OK).json({
        posts : posts
    })
};



// usersPosts 
const getUsersPosts = async(req, res) => {
    const {id} = req.params;
    const post = await Post.find({userId : id}).sort('-createdAt');


    res.status(StatusCodes.OK).json({
        posts : post
    })
};




// like or unlike post

const updatePost = async (req, res) => {
        console.log(req);
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    
  };



// upload picture 
const uploadImage = async(req, res) => {
    // console.log(req)
    // console.log(req.files.img1.tempFilePath)
    // console.log(req.files.img2.tempFilePath)
  const result = await cloudinary.uploader.upload(
    req.files.file.tempFilePath,
    // req.files.img1.tempFilePath,
    // req.files.img2.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }

  );
  fs.unlinkSync(req.files.file.tempFilePath);
  // fs.unlinkSync(req.files.img1.tempFilePath);
  // fs.unlinkSync(req.files.img2.tempFilePath);
  console.log(result);
  return res.status(StatusCodes.OK).json(
    { image: { src: result.secure_url } }
    // {msg : "yeah"}
    );
};




module.exports = {
    createPost,
    updatePost,
    getUsersPosts,
    uploadImage,
    feedPost
}