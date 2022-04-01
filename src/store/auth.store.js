import {
  local_storage_get,
  local_storage_remove,
  local_storage_set,
} from "../utils/local-storage";

const CURRENT_LOGIN_KEY = "login";
const LOGINS_KEY = "logins";

function remove_login() {
  local_storage_remove(CURRENT_LOGIN_KEY);
}

function add_login(login) {
  local_storage_set(CURRENT_LOGIN_KEY, login);
}

function save_login(login) {
  let logins = local_storage_get(LOGINS_KEY);
  if (!logins) logins = [];
  logins.push(login);
  local_storage_set(LOGINS_KEY, logins);
}

function get_login_by_email(email) {
  const logins = local_storage_get(LOGINS_KEY);
  if (!logins) return null;
  return logins.find((login) => login.email === email);
}

function get_current_username() {
  const login = local_storage_get(CURRENT_LOGIN_KEY);
  if (login) return login.name;
  return null;
}

export {
  save_login,
  add_login,
  remove_login,
  get_current_username,
  get_login_by_email,
};
