const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//* =============================================================
//* Routes
//* =============================================================
require('./routes/api/murals')(app);
require('./routes/api/restaurants')(app);

app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
