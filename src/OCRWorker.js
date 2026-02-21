const { createWorker } = require('tesseract.js');

class OCRWorker {
  #workerPromise = null;

  async #getWorker() {
    if (!this.#workerPromise) {
      this.#workerPromise = (async () => {
        const worker = await createWorker();
        await worker.setParameters({
          tessedit_char_whitelist: '0123456789',
          // SINGLE_LINE
          tessedit_pageseg_mode: 7,
        });
        return worker;
      })();
    }
    return this.#workerPromise;
  }

  async recognizeText(buffer) {
    const worker = await this.#getWorker();

    try {
      const result = await worker.recognize(buffer);
      const text = result?.data?.text ?? '';
      // Remove space, tab, newline...
      return text.replace(/\s/g, '');
    } catch (error) {
			console.error('OCR Error')
      throw error;
    }
  }

  async terminateWorker() {
    if (this.#workerPromise) {
      const worker = await this.#workerPromise;
      await worker.terminate();
      this.#workerPromise = null;
    }
  }
}

module.exports = new OCRWorker();

// createWorker()
// https://github.com/naptha/tesseract.js/blob/master/docs/api.md#createworkeroptions-worker
// args: langs | oem | options | config
// langs: 'eng'
// oem: 1 => LSTM_ONLY (Long Short-Term Memory)
// OCR Engine Mode: https://github.com/naptha/tesseract.js/blob/master/src/constants/OEM.js

// setParameters()
// https://github.com/naptha/tesseract.js/blob/master/docs/api.md#workersetparametersparams-jobid-promise
// args: params | jobid
// params:
// - tessedit_char_whitelist: ''
// - tessedit_pageseg_mode: 6 => SINGLE_BLOCK
// PSM: Page Segmentation Mode: https://github.com/naptha/tesseract.js/blob/master/src/constants/PSM.js

// recognize()
// https://github.com/naptha/tesseract.js/blob/master/docs/api.md#workerrecognizeimage-options-output-jobid-promise
// args: image | options | output | jobid
// image: https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md
// output: 'text'

// terminate()
// https://github.com/naptha/tesseract.js/blob/master/docs/api.md#workerterminatejobid-promise
