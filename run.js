require('dotenv').config({ quiet: true });

const { fetchCaptcha, fetchToken, fetchQuery } = require('./src/endpoints');
const { ocrWorker, solveCaptcha } = require('./src/captcha');

const queryPayload = require('./config.json');

(async () => {
  try {
    const captchaBuffer = await fetchCaptcha();
    const verifyCode = await solveCaptcha(captchaBuffer);
		const token = await fetchToken();
		queryPayload.verifyCode = verifyCode
		const data = await fetchQuery(queryPayload, token)
		console.log('Result:', data);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await ocrWorker.terminateWorker();
  }
})();

