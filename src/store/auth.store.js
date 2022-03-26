const KEY = "login";

function save_login(login) {
  localStorage.setItem(KEY, JSON.stringify(login));
}

function remove_login() {
  localStorage.removeItem(KEY);
}

function get_username() {
  const login = localStorage.getItem(KEY);
  if (login) return login.username;
  return null;
}

export { save_login, remove_login, get_username };
