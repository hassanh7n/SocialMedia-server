const Message = require('../models/Message');
const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');



const postMessage = async(req, res) => {
    const {conversationId, senderId, text} = req.body;


    const message = await Message.create({
        conversationId : conversationId,
        senderId : senderId,
        text : text
    });


    await message.save();


    res.status(StatusCodes.CREATED).json({
        message
    })
}

const getAllUsers = async(req, res) => {
    const {id} = req.params;
    // console.log(req.params);
    
    const users = await User.find({});
        // const user = await User.findById({_id : id});
        // const users = await User.find({});
    
        // const userss = users._id !== user.friends
        // console.log(users);


    res.status(StatusCodes.OK).json({
        users
    })
}


const getCoversation = async(req, res) => {
    const {conversationId } = req.body;
    // console.log(conversationId);
    

    const conversation = await Message.find({conversationId : conversationId})
    console.log(conversation);
    
    res.status(StatusCodes.OK).json({
        conversation
    })
}

module.exports = {
    postMessage,
    getAllUsers,
    getCoversation
}