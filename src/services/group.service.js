import { get_current_user } from "../store/auth.store";
import {
  add_group,
  get_groups,
  get_group_by_id,
  remove_group_by_id,
  update_group_by_id,
} from "../store/group.store";
class GroupService {
  static createGroupAndSort(name, date, minValue, maxValue, wishes, members) {
    const group = this.createGroup(
      name,
      date,
      minValue,
      maxValue,
      wishes,
      members
    );
    this.sortGroup(group.id);
  }

  static sortGroup(id) {
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

  static createGroup(name, date, minValue, maxValue, wishes, members) {
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

  static deleteGroup(id) {
    remove_group_by_id(id);
  }

  static getAllGroups() {
    return get_groups();
  }

  static getGroup(id) {
    return get_group_by_id(Number(id));
  }
}

export { GroupService };
