const { fetchToken } = require('./endpoints');
const executeCaptchaQuery = require('./executeCaptchaQuery');

const maxAttempts = 5;

// Decode JWT payload
const decodeJwtPayload = (token) => {
  const payloadBase64 = token.split('.')[1];
  const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf8');
  return JSON.parse(payloadJson);
};

const runCaptchaWorkflow = async () => {
  let token = await fetchToken();
  let { exp } = decodeJwtPayload(token);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`🔄 Attempt ${attempt}`);

		// Defensive token refresh (5s safety buffer)
    const now = Math.floor(Date.now() / 1000);
    if (now > exp - 5) {
      console.log('Token expired - regenerating...');
      token = await fetchToken();
      exp = decodeJwtPayload(token).exp;
    }

    const data = await executeCaptchaQuery(token);

    const { statusCode, message } = data;

    // Retry conditions
    const shouldRetry =
      (statusCode === '0' && message === '系統異常') ||
      (statusCode === '2' && message === '驗證碼錯誤，請重新輸入。');

    if (!shouldRetry) {
      console.log('✅ Final Result:', data);
      return data;
    }

    console.log(`❌ Retry needed: ${message}`);
  }

  throw new Error(`Failed after ${maxAttempts} attempts`);
};

module.exports = runCaptchaWorkflow;
