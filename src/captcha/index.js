const ocrWorker = require('./OCRWorker');

const solveCaptcha = async (buffer, { maxAttempts = 5 } = {}) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    console.log(`🔄 OCR attempt ${attempt + 1}`);

    const code = await ocrWorker.recognizeText(buffer);

    // Ensure the result is exactly 4 digits
    if (/^\d{4}$/.test(code)) {
      console.log('🎯 CAPTCHA:', code);
      return code;
    }
  }

  throw new Error(`Captcha OCR failed after ${maxAttempts} attempts`);
};

module.exports = { ocrWorker, solveCaptcha };
