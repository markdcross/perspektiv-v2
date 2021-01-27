/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  // get all restaurants
  getRestaurants: function () {
    return axios.get('/api/v1/restaurants');
  },

  // get a single restaurant
  getRestaurant: function (id) {
    return axios.get(`/api/v1/restaurants/${id}`);
  }
};
