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
  },
  // get currently logged in user
  getCurrentUser: function () {
    return axios.get('/api/v1/auth/me');
  },
  // update currently logged in user's information
  updateUserInfo: function () {
    return axios.put('/api/v1/auth/updatedetails');
  },
  // update currently logged in user's password
  updatePassword: function () {
    return axios.put('/api/v1/auth/updatepassword');
  },
  // forgot password
  forgotPassword: function () {
    return axios.post('/api/v1/auth/forgotpassword');
  },
  // reset password
  resetPassword: function (resettoken) {
    return axios.put(`/api/v1/auth/resetpassword/${resettoken}`);
  }
};
