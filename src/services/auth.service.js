import { get_username, remove_login, save_login } from "../store/auth.store";

function login(username, password) {
  const login = {
    username: username,
    password: password,
  };

  save_login(login);
}

function logout() {
  remove_login();
}

function get_user() {
  return get_username();
}

function is_logged_in() {
  return get_user() !== null;
}

export { login, logout, get_user, is_logged_in };
