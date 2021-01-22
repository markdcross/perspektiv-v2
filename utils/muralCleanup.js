// find the data in the json object, map over it, capture the new fields in the structure you want
const fs = require('fs');

let cleanData = [];

const getCleanData = data => {
  for (let i = 0; i < data.length; i++) {
    let cleanMural = {
      name: data[i].ExtendedData.Data[2].value,
      address: data[i].address,
      image: data[i].ExtendedData.Data[6].value.__cdata,
      description: data[i].ExtendedData.Data[2].value,
      key: data[i].ExtendedData.Data[0].value,
      area: data[i].ExtendedData.Data[1].value,
      artist: {
        name: data[i].ExtendedData.Data[3].value,
        social: data[i].ExtendedData.Data[4].value,
        website: data[i].ExtendedData.Data[5].value
      }
    };
    cleanData.push(cleanMural);
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

let rawData = fs.readFileSync('../_data/murals.json');
// console.log('🚀 ~ file: muralCleanup.js ~ line 37 ~ rawData', rawData);

let uglyData = JSON.parse(rawData);
// console.log('🚀 ~ file: muralCleanup.js ~ line 39 ~ uglyData', uglyData);

getCleanData(uglyData);
writeToFile(cleanData, '../_data/cleanMurals.json');
