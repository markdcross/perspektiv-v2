const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error.js');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect Database
connectDB();

// Route files
// const users = require('./routes/users');
const auth = require('./routes/auth');
const murals = require('./routes/murals');
const muralPosts = require('./routes/mural-posts');
const restaurants = require('./routes/restaurants');

const app = express();

// Body parser
app.use(express.json({ extended: false }));

// cookie parse
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'client/public')));

// Mount routers
// app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/murals', murals);
app.use('/api/v1/mural-posts', muralPosts);
app.use('/api/v1/restaurants', restaurants);

// Init error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
