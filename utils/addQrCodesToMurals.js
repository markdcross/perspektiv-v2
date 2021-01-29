// ======================================================================
// RUNNING THE CODE BELOW WILL REWRITE QR CODES TO EVERY MURAL IN THE DB
// ======================================================================

// const axios = require('axios');

// axios
//   .get('http://localhost:5000/api/v1/murals')
//   .then(function (response) {
//     // handle success
//     const data = response.data.data;
//     return data;
//   })
//   .then(async (response) => {
//     // loop through each document in the database and update each one
//     for (let i = 0; i < response.length; i++) {
//       //   console.log(`http://localhost:5000/api/v1/murals/${response[i]._id}`);
//       const res = await axios.put(
//         // define the route that needs to be updated
//         `http://localhost:5000/api/v1/murals/${response[i]._id}`,
//         {
//           // set the qr key and value pair on that document in the database
//           qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://perspektivrva.com/api/v1/murals/${response[i]._id}?visited=true`
//         }
//       );
//       res.data.json;
//     }
//     console.log('QR codes added to all murals in database');
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function (data) {
//     // always executed
//   });
