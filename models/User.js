const mongoose = require('mongoose');
const validator = require('validator');
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        min: 2,
        max : 50
    },
    lastName : {
        type : String,
        required : true,
        min :2,
        max : 50,
    },
    email:{
        type : String,
        required : true,
        max : 50,
        unique : true,
        validate:{
            validator : validator.isEmail,
            message : "Please provide valid email"
        }
    },
    password : {
        type : String,
        required : true,
        required : [true, "Please provide password"],
        min: 6
    },
    picture : {
        type : String,
        defrault : "",
    },
    friends : {
        type : Array,
        default : [],
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    location : String,
    occupation : String,
    viewedProfile : Number,
    impressions : Number,
},
    {timestamps : true}
);


UserSchema.pre('save', async function(){
    if(!this.isModified('password'))
    return;
    const salt = await bcryptJs.genSalt(10);
    this.password = await bcryptJs.hash(this.password, salt);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {userId : this._id, name : this.name},
        process.env.JWT_SECRET,
        {
            expiresIn : process.env.JWT_LIFETIME,
        }
    );
};

UserSchema.methods.comparePassword = async function(canditatePassword){
    const isMatch = await bcryptJs.compare(canditatePassword, this.password);
    return isMatch;
}




module.exports = mongoose.model('User', UserSchema);