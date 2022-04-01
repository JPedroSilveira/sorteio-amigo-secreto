function local_storage_get(key) {
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
}

function local_storage_set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function local_storage_remove(key) {
  localStorage.removeItem(key);
}

export { local_storage_get, local_storage_set, local_storage_remove };
