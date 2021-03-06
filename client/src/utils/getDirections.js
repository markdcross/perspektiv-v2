/* eslint-disable import/no-anonymous-default-export */

import axios from 'axios';

export default {
  // get all murals
  getDirections: function (lat, lng, muralLat, muralLng) {
    delete axios.defaults.headers.common['x-auth-token'];
    return axios({
      method: 'GET',
      url: `https://www.mapquestapi.com/directions/v2/route?key=Har1ZZKjsFe24ZZSfUVi3uIQ0Dy1agEi&from=${lat},${lng}&to=${muralLat},${muralLng}+&routeType=pedestrian`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'x-auth-token': undefined
      }
    });
  }
};

//     get(
//       `https://www.mapquestapi.com/directions/v2/route?key=Har1ZZKjsFe24ZZSfUVi3uIQ0Dy1agEi&from=${lat},${lng}&to=${muralLat},${muralLng}+&routeType=pedestrian`,
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }
//     );
//   }
// };

// http://www.mapquestapi.com/directions/v2/route?key=Har1ZZKjsFe24ZZSfUVi3uIQ0Dy1agEi&from=${lat}+${lng}&to=${muralLat}=${muralLng}&routeType=pedestrian
