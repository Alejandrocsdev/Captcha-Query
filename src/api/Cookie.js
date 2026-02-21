class Cookie {
  constructor() {
    this.cookies = new Map();
  }

  set(cookies = []) {
    for (const cookie of cookies) {
      const [cookiePair] = cookie.split(';');
      const eqIndex = cookiePair.indexOf('=');
			// invalid cookie
      if (eqIndex === -1) continue; 
      const name = cookiePair.slice(0, eqIndex).trim();
			// name=value(a=b=c)
      const value = cookiePair.slice(eqIndex + 1).trim();
      this.cookies.set(name, value);
    }
  }

  get() {
    return [...this.cookies.entries()]
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');
  }
}

module.exports = new Cookie();
