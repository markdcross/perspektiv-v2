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
  }
};
