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

function get_login_by_phone(phone) {
  const logins = local_storage_get(LOGINS_KEY);
  if (!logins) return null;
  return logins.find((login) => login.phone === phone);
}

function get_current_user() {
  const login = local_storage_get(CURRENT_LOGIN_KEY);
  if (login) return login;
  return null;
}

export {
  save_login,
  add_login,
  remove_login,
  get_current_user,
  get_login_by_phone,
};
