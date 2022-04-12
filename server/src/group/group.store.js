import Optional from "optional-js";
import { ObjectUtils } from "../utils/object.utils.js";

const groupTable = [];
const groupsByPhone = new Map();

class GroupStore {
  static findGroupById(id) {
    const group = groupTable[id];
    return Optional.ofNullable(group);
  }

  static findGroupsByPhone(phone) {
    const indexes = groupsByPhone.get(phone) ?? [];
    const groups = [];
    indexes.forEach((index) => {
      groups.push(groupTable[index]);
    });
    return groups;
  }

  static update(updatedGroup, oldGroup) {
    groupTable[oldGroup.id] = updatedGroup;
    _removeGroupsByPhone(oldGroup);
    _addGroupsByPhone(updatedGroup);
  }

  static save(group) {
    group.id = groupTable.length;
    groupTable.push(group);
    _addGroupsByPhone(group);
    return group.id;
  }

  static delete(group) {
    _removeGroupsByPhone(group);
    groupTable[group.id] = undefined;
  }
}

function _removeGroupsByPhone(group) {
  group.members.forEach((member) => {
    const groups = groupsByPhone.get(member.phone);
    if (ObjectUtils.isNotEmpty(groups)) {
      const otherGroups = groups.filter((groupId) => group.id !== groupId);
      groupsByPhone.set(member.phone, otherGroups);
    }
  });
}

function _addGroupsByPhone(group) {
  group.members.forEach((member) => {
    const groups = groupsByPhone.get(member.phone) ?? [];
    groups.push(group.id);
    groupsByPhone.set(member.phone, groups);
  });
}

export { GroupStore };
