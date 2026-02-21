const { fetchCaptcha, fetchQuery } = require('./endpoints');
const ocrWorker = require('./OCRWorker');
const queryPayload = require('../config.json');

const executeCaptchaQuery = async (token) => {
  try {
    const buffer = await fetchCaptcha();
    const verifyCode = await ocrWorker.recognizeText(buffer);

    // Validate OCR result before sending request
    if (!/^\d{4}$/.test(verifyCode)) {
      console.log('Invalid OCR result — retrying');
      return { statusCode: '2', message: '驗證碼錯誤，請重新輸入。' };
    }

    console.log('🎯 CAPTCHA:', verifyCode);
		
    queryPayload.verifyCode = verifyCode;
    const data = await fetchQuery(queryPayload, token);

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = executeCaptchaQuery;
