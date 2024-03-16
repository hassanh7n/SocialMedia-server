require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = () => {
  return (
    mongoose.set("strictQuery", false),
    mongoose.connect(process.env.MONGO_URI)
  )
};

module.exports = connectDB;