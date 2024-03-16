require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const morgan = require('morgan');
const cookieParser  = require('cookie-parser')
const fileUpload = require('express-fileupload')
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const authenticateUser = require('./middleware/authentication');

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoute = require('./routes/post');
const postRoutes = require('./routes/postAll');

// USE V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//routes


app.use(express.json());
app.use(express.static('./public'));
// extra packages
// app.use(morgan());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(helmet());

app.use(xss());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));


// routes


app.get('/', (req, res) => {
  res.status(200).send("Social-Media-API ")
})
app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.status(200).send("cookies Routes")
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoute)
app.use('/api/v1/user',   userRoutes);
app.use('/api/v1/posts', authenticateUser, postRoutes)



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000;
// console.log(process.env.MONGO_URI);
const start = async () => {
  try {
    // connectDB
    await connectDB("mongodb+srv://Hassan:Hassan12345@nodejsexpressjs.yqtqanv.mongodb.net/SOCIAL-MEDIA-API?retryWrites=true&w=majority");
    //await EventsSchema.create(EventsData);
    //await BlogsSchema.create(BlogsData);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};


start()