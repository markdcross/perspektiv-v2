/* eslint-disable import/no-anonymous-default-export */

import axios from 'axios';

export default {
  // ==============================
  // GENERAL API CALLS FOR MURALS
  // ==============================

  // get all murals
  getMurals: function () {
    return axios.get('/api/v1/murals');
  },
  // get a single mural
  getMural: function (id) {
    return axios.get(`/api/v1/murals/${id}`);
  },
  // create a new mural
  createMural: function () {
    return axios.post('/api/v1/murals');
  },
  // update a mural
  updateMural: function (id) {
    return axios.put(`/api/v1/murals/${id}`);
  },
  // delete a mural
  deleteMural: function (id) {
    return axios.delete(`/api/v1/murals/${id}`);
  },
  // get murals within a certain radius
  getMuralsInRadius: function (zip, distance) {
    return axios.get(`/api/v1/murals/radius/${zip}/${distance}`);
  },
  visitMural: function (muralId, userId) {
    return axios.put(`/api/v1/murals/visit/${muralId}/${userId}`);
  },
  unvisitMural: function (muralId, userId) {
    return axios.put(`/api/v1/murals/unvisit/${muralId}/${userId}`);
  },

  // ==============================
  // API CALLS FOR POSTS ON MURALS
  // ==============================

  // get all posts for a specific murals
  getMuralPosts: function (muralId) {
    return axios.get(`/api/v1/murals/${muralId}/posts`);
  },
  // get a specific mural post
  getMuralPost: function (id) {
    return axios.get(`/api/v1/mural-posts/${id}`);
  },
  // create a new post for a mural
  createMuralPost: function (muralId) {
    return axios.post(`/api/v1/murals/${muralId}/posts`);
  },
  // update a post for a mural
  updateMuralPost: function (id) {
    return axios.put(`/api/v1/mural-posts/${id}`);
  },
  // update a post for a mural
  deleteMuralPost: function (id) {
    return axios.delete(`/api/v1/mural-posts/${id}`);
  },
  // upload a photo for a mural post
  uploadPhotoOnMuralPost: function (id) {
    return axios.put(`/api/v1/mural-posts/${id}/photo`);
  }
};
