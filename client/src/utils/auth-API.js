/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  // register a new user
  registerUser: function () {
    return axios.post('/api/v1/auth/register');
  },
  // login a user
  loginUser: function () {
    return axios.post('/api/v1/auth/login');
  },
  // logout a user
  logoutUser: function () {
    return axios.get('/api/v1/auth/logout');
  }
};
