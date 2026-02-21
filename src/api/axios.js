const axios = require('axios');

const cookie = require('./Cookie');

const axiosInstance = axios.create({ baseURL: process.env.BASE_URL });

// Request interceptor
axiosInstance.interceptors.request.use((request) => {
  const cookies = cookie.get();
  if (cookies) {
    request.headers.Cookie = cookies;
  }
  return request;
});

// Response interceptor
axiosInstance.interceptors.response.use((response) => {
  const cookies = response.headers['set-cookie'];
  if (cookies) {
    cookie.set(cookies);
  }
  return response;
});

module.exports = axiosInstance;
