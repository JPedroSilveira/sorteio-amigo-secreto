import { get_current_user } from "../store/auth.store";
import {
  add_group,
  get_groups,
  get_group_by_id,
  remove_group_by_id,
  update_group_by_id,
} from "../store/group.store";

function create_group_and_sort(
  name,
  date,
  minValue,
  maxValue,
  wishes,
  members
) {
  const group = create_group(name, date, minValue, maxValue, wishes, members);
  sort_group(group.id);
}

function sort_group(id) {
  const group = get_group_by_id(id);
  if (group) {
    const user = get_current_user();
    const possible_members_to_sorte = group.members.filter(
      (member) => member.phone !== user.phone
    );
    group.sorted_member =
      possible_members_to_sorte[
        Math.floor(Math.random() * possible_members_to_sorte.length)
      ];
    update_group_by_id(id, group);
  }
}

function create_group(name, date, minValue, maxValue, wishes, members) {
  const user = get_current_user();
  const userNeedsToBeAdded = !members.some(
    (member) => member.phone === user.phone
  );
  if (userNeedsToBeAdded) {
    members.push({
      name: user.name,
      phone: user.phone,
    });
  }

  return add_group({
    name: name,
    date: date,
    minValue: minValue,
    maxValue: maxValue,
    wishes: wishes,
    members: members,
  });
}

function remove_group(id) {
  remove_group_by_id(id);
}

function get_all_groups() {
  return get_groups();
}

function get_group(id) {
  return get_group_by_id(Number(id));
}

export {
  create_group,
  remove_group,
  get_all_groups,
  sort_group,
  create_group_and_sort,
  get_group,
};
