/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  // get a single user
  getUser: function (id) {
    return axios.get(`/api/v1/auth/users/${id}`);
  },
  // get a list of ALL users
  getAllUsers: function () {
    return axios.get(`/api/v1/auth/users`);
  },
  // create a new user
  createUser: function () {
    return axios.post('/api/v1/auth/users');
  },
  // update a user
  updateUser: function (id) {
    return axios.put(`/api/v1/auth/users/${id}`);
  },
  // delete a user
  deleteUser: function (id) {
    return axios.delete(`/api/v1/auth/users/${id}`);
  }
};
