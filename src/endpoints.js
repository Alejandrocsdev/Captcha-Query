const { api, axiosInstance } = require('./api');

const { API_CAPTCHA, API_TOKEN, API_NAME, API_QUERY } = process.env;

exports.fetchCaptcha = async () => {
  const res = await api(
    axiosInstance.get(`${API_CAPTCHA}?s=${Date.now()}`, {
      responseType: 'arraybuffer',
    }),
  );
  return Buffer.from(res.data);
};

exports.fetchToken = async () => {
  const payload = new URLSearchParams({ apiName: API_NAME }).toString();
  const res = await api(
    axiosInstance.post(API_TOKEN, payload, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),
  );
  const token = res?.data?.auth_tn;
  if (!token) {
    throw new Error('Failed to obtain auth token');
  }
  return token;
};

exports.fetchQuery = async (payload, token) => {
  const res = await api(
    axiosInstance.post(API_QUERY, payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
  return res.data;
};
