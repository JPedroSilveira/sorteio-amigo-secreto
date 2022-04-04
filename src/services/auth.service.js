import {
  remove_login,
  add_login,
  get_current_user,
  get_login_by_phone,
} from "../store/auth.store";

function login(email, password) {
  const desiredLogin = get_login_by_phone(email);
  if (desiredLogin && desiredLogin.password === password) {
    add_login(desiredLogin);
    return true;
  }
  return false;
}

function logout() {
  remove_login();
}

function get_logged_user() {
  return get_current_user();
}

function is_logged_in() {
  return get_logged_user() !== null;
}

export { login, logout, get_current_user as get_user, is_logged_in };
