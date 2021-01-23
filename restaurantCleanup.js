const fs = require('fs');

let rawData = fs.readFileSync('./_data/restaurants.json');

let uglyData = JSON.parse(rawData);

const uniqueRestaurants = Array.from(new Set(uglyData.map(a => a.id))).map(
  id => {
    return uglyData.find(a => a.id === id);
  }
);

let cleanData = [];

console.log(
  uniqueRestaurants[0].location.display_address[0] +
    ' ' +
    uniqueRestaurants[0].location.display_address[1]
);

const getCleanData = data => {
  for (let i = 0; i < data.length; i++) {
    let cleanRestaurant = {
      id: data[i].id,
      name: data[i].name,
      address: `${data[i].location.display_address[0]} ${data[i].location.display_address[1]}`,
      image: data[i].image_url,
      price: data[i].price,
      rating: data[i].rating,
      category: data[i].categories[0].title,
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
writeToFile(cleanData, './_data/cleanRestaurants.json');
