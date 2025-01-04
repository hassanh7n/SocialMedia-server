const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const Conversation = require('../models/Conversation');

// get user

const getUser = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    
    const user = await User.findOne({_id : id});
    res.status(StatusCodes.OK).json({
        user
    })
};


// get all users
const getAllUsers = async(req, res) => {
    const {name} = req.query;
    if(!name){
        throw new CustomError("Hey")
    }
    console.log(req.query)
    const queryObject = {};

    if(name){
        queryObject.firstName = { $regex : name, $options : "i"}
      }
      let result = User.find(queryObject);

    const user = await result;
    res.status(StatusCodes.OK).json({
        user
    })
}

// get all users messengers
const getAllMessengersUsers = async(req, res) => {
    const {id} = req.params;
    console.log()
    const user = await User.findById({_id : id});
    const users = await User.find({});
    
    function checkAdult(user) {
        return user.friends !== users._id;
    }
    
    
    const userss = users.filter(checkAdult(users))
    console.log(userss);
    
    res.status(StatusCodes.OK).json({
        user
    })
}

// user friends
const getUserFriends = async(req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picture }) => {
              return { _id, firstName, lastName, occupation, location, picture };
            }
          );
    
    res.status(StatusCodes.OK).json({
        formattedFriends
    })
};




// add or remove friends
const addRemoveFriends = async(req, res) => {
    const {id, friendId} = req.params;
    
    
        
    const user  = await User.findById(id);
    const friend = await User.findById(friendId);

    if(id === friendId){
        throw new CustomError.BadRequestError("Bad Request")
    }
    
    if(user.friends.includes(friendId)){
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id)
    }else{
        user.friends.push(friendId);
        friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picture }) => {
          return { _id, firstName, lastName, occupation, location, picture };
        }
      );

    res.status(StatusCodes.OK).json({
        formattedFriends
    })
};


module.exports =  {
    getUser, 
    addRemoveFriends, 
    getUserFriends,
    getAllUsers,
    getAllMessengersUsers
}