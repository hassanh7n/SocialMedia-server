const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment : {
        type : String,
        required : [true, "Please provide comment"]
    },
    name : {
        type : String,
        required : [true, "Please provide the name"],
    },
    bioPic : {
        type : String,
        required : [true, "Please provide the bioPic"]
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
    postId : {
        type : mongoose.Schema.ObjectId,
        ref : "Post",
        required : true,
    }
});



module.exports = mongoose.model('Comment', commentSchema);