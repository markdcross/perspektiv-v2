const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Mural = require('./models/Mural');
const Restaurant = require('./models/Restaurant');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const murals = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cleanMurals.json`, 'utf-8')
);

const restaurants = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cleanRestaurants.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Mural.create(murals);
    await Restaurant.create(restaurants);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await Mural.deleteMany();
    await Restaurant.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
