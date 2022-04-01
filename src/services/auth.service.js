import {
  get_login_by_email,
  get_current_username,
  remove_login,
  add_login,
} from "../store/auth.store";

function login(email, password) {
  const desiredLogin = get_login_by_email(email);
  if (desiredLogin && desiredLogin.password === password) {
    add_login(desiredLogin);
    return true;
  }
  return false;
}

function logout() {
  remove_login();
}

function get_current_user() {
  return get_current_username();
}

function is_logged_in() {
  return get_current_user() !== null;
}

export { login, logout, get_current_user as get_user, is_logged_in };
