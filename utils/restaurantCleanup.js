const fs = require('fs');

let rawData = fs.readFileSync('./_data/cleanRestaurants.json');

let uglyData = JSON.parse(rawData);

const uniqueRestaurants = Array.from(new Set(uglyData.map(a => a.id))).map(
  id => {
    return uglyData.find(a => a.id === id);
  }
);

let cleanData = [];

const getCleanData = data => {
  for (let i = 0; i < data.length; i++) {
    let cleanRestaurant = {
      name: data[i].name,
      address: data[i].address,
      image: data[i].image_url,
      imageFile: data[i].imageFile,
      price: data[i].price,
      rating: data[i].rating,
      category: data[i].category,
      phone: data[i].display_phone
    };
    cleanData.push(cleanRestaurant);
  }
  return cleanData;
};

const writeToFile = (data, path) => {
  const json = JSON.stringify(data, null, 2);
  fs.writeFile(path, json, err => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('Saved data to file.');
  });
};

getCleanData(uniqueRestaurants);
writeToFile(cleanData, './_data/cleanerRestaurants.json');
