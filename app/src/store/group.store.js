import { local_storage_get, local_storage_set } from "../utils/local-storage";

const CURRENT_GROUP_KEY = "groups";

function remove_group_by_id(id) {
  let groups = get_groups();
  groups = groups.filter((group) => group.id !== id);
  local_storage_set(CURRENT_GROUP_KEY, groups);
}

function add_group(group) {
  let groups = get_groups();
  group.id = groups.length;
  groups.push(group);
  local_storage_set(CURRENT_GROUP_KEY, groups);
  return group.id;
}

function get_groups() {
  const groups = local_storage_get(CURRENT_GROUP_KEY);
  if (!groups) return [];
  return groups;
}

function get_group_by_id(id) {
  const groups = get_groups();
  if (!groups) return null;
  return groups.find((group) => group.id === id);
}

function update_group_by_id(id, group) {
  let groups = get_groups();
  groups = groups.filter((group) => group.id !== id);
  groups.push(group);
  local_storage_set(CURRENT_GROUP_KEY, groups);
}

export {
  remove_group_by_id,
  add_group,
  get_groups,
  get_group_by_id,
  update_group_by_id,
};
