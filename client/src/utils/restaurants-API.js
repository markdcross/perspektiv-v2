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
  },
  // create a new restaurant
  createRestaurant: function () {
    return axios.post('/api/v1/restaurants');
  },
  // update a restaurant
  updateRestaurant: function (id) {
    return axios.put(`/api/v1/restaurants/${id}`);
  },
  // delete a restaurant
  deleteRestaurant: function (id) {
    return axios.delete(`/api/v1/restaurants/${id}`);
  }
};
