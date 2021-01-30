/* eslint-disable import/no-anonymous-default-export */

import axios from 'axios';

export default {
  // get all murals
  getDirections: function (lat, lng, muralLat, muralLng) {
    return axios.get(
      `http://www.mapquestapi.com/directions/v2/route?key=Har1ZZKjsFe24ZZSfUVi3uIQ0Dy1agEi&from=${lat},${lng}&to=${muralLat},${muralLng}+&routeType=pedestrian`
    );
  }
};

// http://www.mapquestapi.com/directions/v2/route?key=Har1ZZKjsFe24ZZSfUVi3uIQ0Dy1agEi&from=${lat}+${lng}&to=${muralLat}=${muralLng}&routeType=pedestrian
