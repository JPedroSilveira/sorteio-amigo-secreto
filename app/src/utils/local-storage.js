class LocalStorage {
  static get(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key) {
    localStorage.removeItem(key);
  }
}

export { LocalStorage };
