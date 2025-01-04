const mongoose = require('mongoose');



const messageSchema = new mongoose.Schema({
    conversationId : {
        type : String,
        required : true,
    },
    senderId : {
        type : String,
        required : true,
    },
    text : {
        type : String,
        required : true,
    },
    createdAt:{
        type : String
    }
},
{timestamps : true}


)


module.exports  = mongoose.model("Message", messageSchema);