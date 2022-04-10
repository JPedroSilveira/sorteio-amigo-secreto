import {
  remove_login,
  add_login,
  get_current_user,
  get_login_by_phone,
} from "../store/auth.store";
class AuthService {
  static login(email, password) {
    const desiredLogin = get_login_by_phone(email);
    if (desiredLogin && desiredLogin.password === password) {
      add_login(desiredLogin);
      return true;
    }
    return false;
  }

  static logout() {
    remove_login();
  }

  static getCurrentUser() {
    return get_current_user();
  }

  static isLoggedIn() {
    return this.getCurrentUser() !== null;
  }
}

export { AuthService };
