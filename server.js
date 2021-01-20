const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

// Load env vars
dotenv.config();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('API Running'));

//* =============================================================
//* Routes
//* =============================================================
require('./routes/api/murals')(app);
require('./routes/api/restaurants')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  )
);
