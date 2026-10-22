/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  // ==============================
  // GENERAL API CALLS FOR MURALS
  // ==============================

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
  },

  // ==============================
  // API CALLS FOR POSTS ON MURALS
  // ==============================
  // get all posts for a specific restaurant
  getRestaurantPosts: function (restaurantId) {
    return axios.get(`/api/v1/restaurants/${restaurantId}/posts`);
  },
  // get a specific restaurant post
  getRestaurantPost: function (id) {
    return axios.get(`/api/v1/restaurant-posts/${id}`);
  },
  // create a new post on a restaurant
  createRestaurantPost: function (restaurantId) {
    return axios.post(`/api/v1/restaurants/${restaurantId}/posts`);
  },
  // update a post for a restaurant
  updateRestaurantPost: function (id) {
    return axios.put(`/api/v1/restaurant-posts/${id}`);
  },
  deleteRestaurantPost: function (id) {
    return axios.delete(`/api/v1/restaurant-posts/${id}`);
  },
  uploadPhotoOnRestaurantPost: function (id) {
    return axios.put(`/api/v1/restaurant-posts/${id}/photo`);
  }
};
