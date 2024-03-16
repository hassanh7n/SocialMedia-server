const mongoose = require('mongoose');

const connectDB = (url) => {
  return (
    mongoose.set("strictQuery", true),
    mongoose.connect(url)
  )
};

module.exports = connectDB;