const Conversation = require('../models/Conversation');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const User = require('../models/User');
const { error } = require('console');


const createConversation = async(req, res) => {
    const {senderId, recieverId} = req.body;
    
    const senderUser = await User.findById(senderId);
    const recieverUser = await User.findById(recieverId);
    // console.log(senderUser, recieverUser);

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, recieverId] },
    });
    console.log(conversation);
    

    if(conversation){
      throw new error("hello")
    }

    const newConversation = new Conversation({
      members: [
        senderId, 
        recieverId
      ],
      senderName : senderUser.firstName,
      senderPicture : senderUser.picture,
      receiverName : recieverUser.firstName,
      receiverPicture : recieverUser.picture
      });
      try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
}



const getConvOfUser = async(req, res) => {
    try {
        const conversation = await Conversation.find({
          members: { $in: [req.params.userId] },
        });

        // const {members} = conversation
      // const user =  User.findById(id)


        // console.log(conversation);
        
        res.status(200).json({
          "conversations" : conversation
        });
      } catch (err) {
        res.status(500).json(err);
      }
}


const getConvOfTwoUsers = async(req, res) => {
    try {
        const conversation = await Conversation.findOne({
          members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        console.log(conversation);
        
        res.status(200).json(conversation)
      } catch (err) {
        res.status(500).json(err);
      }
}


module.exports = {
    createConversation,
    getConvOfUser,
    getConvOfTwoUsers
}