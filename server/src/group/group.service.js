import { group } from "console";
import { ListUtils } from "../utils/list.utils.js";
import { ObjectUtils } from "../utils/object.utils.js";
import { GroupStore } from "./group.store.js";

class GroupService {
  static getAll(user) {
    return GroupStore.findGroupsByPhone(user.phone);
  }

  static save(group, user) {
    group.owner = user.phone;
    group.members = _addOwnerToMembers(group, user);
    group.members = _removeDuplicatedMembers(group.members);
    const id = GroupStore.save(group);
    return id;
  }

  static update(updatedGroup, user) {
    const group = GroupStore.findGroupById(updatedGroup.id);
    if (group.isPresent()) {
      const oldGroup = group.get();
      if (_isUserOwner(oldGroup, user)) {
        updatedGroup.owner = user.phone;
        updatedGroup.members = _addOwnerToMembers(updatedGroup, user);
        updatedGroup.members = _removeDuplicatedMembers(updatedGroup.members);
        GroupStore.update(updatedGroup, oldGroup);
        return true;
      }
    }
    return false;
  }

  static delete(id, user) {
    const group = GroupStore.findGroupById(id);
    if (group.isPresent()) {
      const existentGroup = group.get();
      if (_isUserOwner(existentGroup, user)) {
        GroupStore.delete(existentGroup);
        return true;
      }
    }
    return false;
  }

  static isValidGroupForUpdate(group) {
    return ObjectUtils.isNotEmpty(group.id) && ObjectUtils.isNumber(group.id);
  }

  static isValidGroup(group) {
    return (
      ObjectUtils.isNotEmpty(group.name) &&
      ObjectUtils.isString(group.name) &&
      ObjectUtils.isNotEmpty(group.date) &&
      ObjectUtils.isString(group.date) &&
      ObjectUtils.isNotEmpty(group.minValue) &&
      ObjectUtils.isNumber(group.minValue) &&
      ObjectUtils.isNotEmpty(group.maxValue) &&
      ObjectUtils.isNumber(group.maxValue) &&
      ObjectUtils.isNotEmpty(group.members) &&
      group.members.every(
        (member) =>
          ObjectUtils.isNotEmpty(member.name) &&
          ObjectUtils.isString(member.name) &&
          ObjectUtils.isNotEmpty(member.phone) &&
          ObjectUtils.isNumber(member.phone)
      )
    );
  }
}

function _isUserOwner(group, user) {
  return group.owner === user.phone;
}

function _removeDuplicatedMembers(members) {
  return ListUtils.removeDuplicates(members, (member) => member.phone);
}

function _addOwnerToMembers(group, user) {
  const members = [...group.members];
  const ownerIsNotAMember = group.members.every(
    (member) => member.phone !== user.phone
  );

  if (ownerIsNotAMember) {
    members.push({
      name: user.name,
      phone: user.phone,
    });
  }

  return members;
}

export { GroupService };
