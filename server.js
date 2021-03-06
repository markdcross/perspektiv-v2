const path = require('path');
const https = require('https');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
// const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error.js');
const connectDB = require('./config/db');
const compression = require('compression');

// Load env vars
dotenv.config();

// Connect Database
connectDB();

// Route files
// const users = require('./routes/users');
const auth = require('./routes/auth');
const murals = require('./routes/murals');
const muralPosts = require('./routes/mural-posts');
const restaurantPosts = require('./routes/restaurant-posts');
const restaurants = require('./routes/restaurants');
const users = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// compression middleware
app.use(compression());

// Body parser
app.use(express.json({ extended: true }));

// cookie parse
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
// app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
// app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 minutes
//   max: 1000
// });

// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/murals', murals);
app.use('/api/v1/mural-posts', muralPosts);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/restaurant-posts', restaurantPosts);

// Init error handler
app.use(errorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/public')));
}

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold
  )
);
// }

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
