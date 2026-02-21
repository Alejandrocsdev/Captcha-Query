# Captcha-Query

A Node.js automation workflow for querying a remote service protected by a CAPTCHA challenge.

This project demonstrates a complete programmatic pipeline that:

1. Obtains an authentication token
2. Fetches a CAPTCHA image
3. Recognizes the CAPTCHA using OCR (Tesseract.js)
4. Submits the query request
5. Retries automatically when necessary

> ⚠️ This repository is intended for demonstration purposes only.

---

## ✨ Features

- 🔐 Token-based authentication
- 🖼️ CAPTCHA fetching and solving
- 🤖 OCR using **Tesseract.js**
- 🔁 Intelligent retry logic
- ⏱️ Automatic token refresh before expiration
- 🍪 Session cookie handling
- 🧩 Modular architecture
- 🚫 No hard-coded endpoints (environment-based configuration)

---

## 🏗️ Workflow Overview

```
fetchToken
   ↓
RETRY LOOP (maxAttempts)
   ├─ fetchCaptcha
   ├─ recognizeText (OCR)
   └─ fetchQuery
```

Retry conditions include:

- Invalid CAPTCHA recognition
- Server error responses
- CAPTCHA validation failure

---

## 📦 Requirements

- Node.js 18+
- npm
- Internet connection

---

### 1️⃣ Query Payload (config.json)

Edit `config.json` with the required query data:

```
{
  "name": "",
  "idNo": ""
}
```

---

## ▶️ Usage

Run the workflow:

node run.js

The script will:

- Initialize session
- Retrieve authentication token
- Solve CAPTCHA
- Submit query
- Retry automatically if needed

---

## 🧠 OCR Engine

This project uses:

**Tesseract.js**

Configured for numeric CAPTCHA recognition:

- Single-line mode
- Digit whitelist
- Worker reuse for performance

---

## 🔄 Retry Strategy

The workflow retries when receiving responses indicating:

- CAPTCHA validation failure
- Temporary system errors

A new token is requested automatically if the current one is near expiration.

---

## 🧪 Notes

- Designed as a self-contained script (not a public API)
- Suitable for automation demonstrations or technical presentations
- Emphasizes clean architecture and defensive programming

---

## 📜 License

MIT License
