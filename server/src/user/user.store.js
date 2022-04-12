import Optional from "optional-js";

const userTable = [];
const userByPhone = new Map();

class UserStore {
  static findUserByPhone(phone) {
    const index = userByPhone.get(phone);
    return Optional.ofNullable(userTable[index]);
  }

  static save(user) {
    const index = userTable.length;
    userTable.push(user);
    userByPhone.set(user.phone, index);
  }
}

export { UserStore };
