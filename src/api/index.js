const axiosInstance = require('./axios');

const api = async (request) => {
  try {
    const res = await request;
    return res;
  } catch (error) {
		console.error('Request Error')
    throw error;
  }
};

module.exports = { api, axiosInstance };
