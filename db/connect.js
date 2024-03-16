const mongoose = require('mongoose');

const connectDB = (url) => {
  return (
    mongoose.set("strictQuery", false),
    mongoose.connect(url)
  )
};

module.exports = connectDB;