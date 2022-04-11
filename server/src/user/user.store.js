import Optional from "optional-js";

const userTable = new Map();

class UserStore {
  static findUserByPhone(phone) {
    const user = userTable.get(phone);
    return Optional.ofNullable(user);
  }

  static save(name, phone, encryptedPassoword) {
    userTable.set(phone, {
      name: name,
      phone: phone,
      encryptedPassword: encryptedPassoword,
    });
  }
}

export { UserStore };
