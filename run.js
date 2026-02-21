require('dotenv').config({ quiet: true });

const runCaptchaWorkflow = require('./src/runCaptchaWorkflow');
const ocrWorker = require('./src/OCRWorker');

(async () => {
  try {
    await runCaptchaWorkflow();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await ocrWorker.terminateWorker();
  }
})();
