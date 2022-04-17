import Optional from "optional-js";
import { Length } from "../utils/length.utils.js";
import { List } from "../utils/list.utils.js";
import { Objects } from "../utils/objects.utils.js";
import { GroupStore } from "./group.store.js";

class GroupService {
  static getAll(user) {
    const groups = GroupStore.findGroupsByPhone(user.phone);
    groups.forEach((group) => {
      Private.addUserSecretFriend(user, group);
      Private.removeResult(group);
    });

    return groups;
  }

  static get(id, user) {
    const group = GroupStore.findGroupById(id);
    if (group.isPresent()) {
      if (Private.userBelongsToGroup(group.get(), user)) {
        Private.addUserSecretFriend(group.get(), user);
        Private.removeResult(group.get());
        return group;
      }
    }
    return Optional.empty();
  }

  static save(group, user) {
    group.owner = user.phone;
    group.members = Private.removeDuplicatedMembers(group.members);
    group.members.forEach((member) => {
      if (member.phone !== user.phone) {
        delete member.wishes;
      }
    });
    const id = GroupStore.save(group);
    return id;
  }

  static update(updatedGroup, user) {
    const group = GroupStore.findGroupById(updatedGroup.id);
    if (group.isPresent()) {
      const oldGroup = group.get();
      if (Private.isUserOwner(oldGroup, user)) {
        updatedGroup.owner = user.phone;
        updatedGroup.result = oldGroup.result;
        updatedGroup.members = Private.removeDuplicatedMembers(
          updatedGroup.members
        );
        updatedGroup.members.forEach((member) => {
          if (member.phone !== user.phone) {
            const memberIdOldGroup = oldGroup.members.find(
              (m) => m.phone === member.phone
            );
            if (Objects.isNotEmpty(memberIdOldGroup)) {
              member.wishes = memberIdOldGroup.wishes;
            }
          }
        });
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
      if (Private.isUserOwner(existentGroup, user)) {
        GroupStore.delete(existentGroup);
        return true;
      }
    }
    return false;
  }

  static sort(id, user) {
    const group = GroupStore.findGroupById(id);
    if (group.isPresent()) {
      if (Private.isUserOwner(group.get(), user)) {
        const sortResult = new Map();
        const members = group.get().members;
        const sortedMembers = [...List.sortRandomly(members)];
        let availableMembers = [...List.sortRandomly(members)];
        sortedMembers.forEach((member, index) => {
          let sortedFriend;

          if (
            availableMembers.length === 2 &&
            availableMembers.some(
              (m) => m.phone === sortedMembers[index + 1].phone
            )
          ) {
            sortedFriend = sortedMembers[index + 1];
          } else {
            sortedFriend = List.getRandom(availableMembers);

            while (sortedFriend.phone === member.phone) {
              sortedFriend = List.getRandom(availableMembers);
            }
          }

          sortResult.set(member.phone, sortedFriend.phone);
          availableMembers = availableMembers.filter(
            (m) => m.phone !== sortedFriend.phone
          );
        });

        group.get().result = sortResult;

        GroupStore.update(group.get(), group.get());
        return true;
      }
    }
    return false;
  }

  static saveWishes(id, wishes, user) {
    const group = GroupStore.findGroupById(id);
    if (group.isPresent()) {
      const member = Private.getMemberByPhone(group.get(), user.phone);
      if (member.isPresent()) {
        member.get().wishes = wishes;
        GroupStore.update(group.get(), group.get());
        return true;
      }
    }
    return false;
  }

  static isValidGroupForUpdate(group) {
    return Objects.isNotEmpty(group.id) && Objects.isNumber(group.id);
  }

  static isValidGroup(group) {
    return (
      Objects.isNotEmpty(group.name) &&
      Objects.isString(group.name) &&
      Objects.isNotEmpty(group.date) &&
      Objects.isString(group.date) &&
      Objects.isNotEmpty(group.minValue) &&
      Objects.isNumber(group.minValue) &&
      Objects.isNotEmpty(group.maxValue) &&
      Objects.isNumber(group.maxValue) &&
      (Objects.isEmpty(group.members) ||
        group.members.every(
          (member) =>
            Objects.isNotEmpty(member.name) &&
            Objects.isString(member.name) &&
            Objects.isNotEmpty(member.phone) &&
            Objects.isString(member.phone) &&
            Length.isEqual(member.phone, 11)
        ))
    );
  }
}

class Private {
  static addUserSecretFriend(group, user) {
    const result = group.result;
    if (Objects.isNotEmpty(result)) {
      const secretFriendPhone = result.get(user.phone);
      group.secretFriend = group.members.find(
        (member) => member.phone === secretFriendPhone
      );
    }
  }

  static removeResult(group) {
    delete group.result;
  }

  static isUserOwner(group, user) {
    return group.owner === user.phone;
  }

  static userBelongsToGroup(group, user) {
    return (
      group.owner === user.phone ||
      group.members.some((member) => Objects.isEqual(member.phone, user.phone))
    );
  }

  static getMemberByPhone(group, phone) {
    return Optional.ofNullable(
      group.members.find((member) => Objects.isEqual(member.phone, phone))
    );
  }

  static removeDuplicatedMembers(members) {
    return List.removeDuplicates(members, (member) => member.phone);
  }
}

export { GroupService };
