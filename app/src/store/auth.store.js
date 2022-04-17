import { LocalStorage } from "../utils/local-storage";

const LOGIN_KEY = "login";

class AuthStore {
  static remove() {
    LocalStorage.remove(LOGIN_KEY);
  }

  static add(key) {
    LocalStorage.set(LOGIN_KEY, key);
  }

  static get() {
    return LocalStorage.get(LOGIN_KEY);
  }
}

export { AuthStore };
