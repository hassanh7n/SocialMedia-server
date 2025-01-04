const { timeStamp } = require('console');
const mongoose = require('mongoose');


const conversationSchema = new mongoose.Schema({
    members : {
        type : Array,
        default : []
    },
    senderName : {
        type : String,
    },
    senderPicture : {
        type : String,
    },
    receiverName : {
        type : String,
    },
    receiverPicture : {
        type : String,
    }
},
{timestamps : true}
);


module.exports = mongoose.model("Coversation", conversationSchema);