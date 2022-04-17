import Optional from "optional-js";
import { Objects } from "../utils/objects.utils.js";
import { Stores } from "../utils/store.utils.js";

const groupTableManager = Stores.generateStoreManager("groupTable");

const groupsByPhoneTableManager =
  Stores.generateStoreManager("groupsByPhoneTable");

class GroupStore {
  static findGroupById(id) {
    const groupTable = groupTableManager.read();
    const group = Optional.ofNullable(groupTable[id]);
    if (group.isPresent()) {
      return Optional.of({ ...group.get() });
    }
    return Optional.empty();
  }

  static findGroupsByPhone(phone) {
    const groupTable = groupTableManager.read();
    const groupsByPhoneTable = groupsByPhoneTableManager.read();
    const indexes = groupsByPhoneTable.get(phone) ?? [];
    const groups = [];
    indexes.forEach((index) => {
      groups.push({ ...groupTable[index] });
    });
    return groups;
  }

  static update(updatedGroup, oldGroup) {
    groupTableManager.apply((groupTable) => {
      groupsByPhoneTableManager.apply((groupsByPhoneTable) => {
        groupTable[oldGroup.id] = { ...updatedGroup };
        _removeGroupsByPhone(oldGroup, groupsByPhoneTable);
        _addGroupsByPhone(updatedGroup, groupsByPhoneTable);
      });
    });
  }

  static save(group) {
    return groupTableManager.apply((groupTable) => {
      return groupsByPhoneTableManager.apply((groupsByPhoneTable) => {
        group.id = groupTable.length;
        groupTable.push(group);
        _addGroupsByPhone(group, groupsByPhoneTable);
        return group.id;
      });
    });
  }

  static delete(group) {
    groupTableManager.apply((groupTable) => {
      groupsByPhoneTableManager.apply((groupsByPhoneTable) => {
        _removeGroupsByPhone(group, groupsByPhoneTable);
        groupTable[group.id] = undefined;
      });
    });
  }
}

function _removeGroupsByPhone(group, groupsByPhoneTable) {
  group.members.forEach((member) => {
    const groups = groupsByPhoneTable.get(member.phone);
    if (Objects.isNotEmpty(groups)) {
      const otherGroups = groups.filter((groupId) => group.id !== groupId);
      groupsByPhoneTable.set(member.phone, otherGroups);
    }
  });
  const groups = groupsByPhoneTable.get(group.owner);
  if (Objects.isNotEmpty(groups)) {
    const otherGroups = groups.filter((groupId) => group.id !== groupId);
    groupsByPhoneTable.set(group.owner, otherGroups);
  }
}

function _addGroupsByPhone(group, groupsByPhoneTable) {
  group.members.forEach((member) => {
    const groups = groupsByPhoneTable.get(member.phone) ?? [];
    groups.push(group.id);
    groupsByPhoneTable.set(member.phone, groups);
  });

  const ownerIsNotAMember = group.members.every((m) => m.phone !== group.owner);
  if (ownerIsNotAMember) {
    const groups = groupsByPhoneTable.get(group.owner) ?? [];
    groups.push(group.id);
    groupsByPhoneTable.set(group.owner, groups);
  }
}

export { GroupStore };
