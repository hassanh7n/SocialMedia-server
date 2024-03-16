const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

//Register

const register = async(req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        picture,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions
    } = req.body;

    const isEmailAlreadyExisted = await User.findOne({email : email});
    if(isEmailAlreadyExisted){
        throw new CustomError.BadRequestError('Email already existed')
    };
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await User.create({firstName, lastName, email, password, occupation, location, picture, impressions : Math.floor(Math.random() * 10000), viewedProfile : Math.floor(Math.random() * 10000), friends})

    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user : user,
        token
    })

};


//login;

const login = async(req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide both email and password")
    };
    const user = await User.findOne({email : email});
    if(!user){
        throw new CustomError.UnAuthorizeError('inavlid Credentials')
    };
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnAuthorizeError('Invalid credentials')
    };

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user : user,
        token
    })
}



// upload picture 
const uploadImage = async(req, res) => {
    // console.log(req.files.images.tempFilePath)
    // console.log(req.files.img1.tempFilePath)
    // console.log(req.files.img2.tempFilePath)
  const result = await cloudinary.uploader.upload(
    req.files.images.tempFilePath,
    // req.files.img1.tempFilePath,
    // req.files.img2.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }

  );
  fs.unlinkSync(req.files.images.tempFilePath);
  // fs.unlinkSync(req.files.img1.tempFilePath);
  // fs.unlinkSync(req.files.img2.tempFilePath);
  console.log(result);
  return res.status(StatusCodes.OK).json(
    { image: { src: result.secure_url } }
    // {msg : "yeah"}
    );
}






module.exports = {
    register,
    login,
    uploadImage
}