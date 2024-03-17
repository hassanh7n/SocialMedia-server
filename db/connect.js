require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = () => {
  return (
    mongoose.set("strictQuery", false),
    mongoose.connect("mongodb+srv://Hassan:Hassan12345@nodejsexpressjs.yqtqanv.mongodb.net/SOCIAL-MEDIA-API?retryWrites=true&w=majority")
  )
};

module.exports = connectDB;