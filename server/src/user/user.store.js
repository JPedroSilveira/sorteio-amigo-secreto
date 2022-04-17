import Optional from "optional-js";
import { Stores } from "../utils/store.utils.js";

const userTableManager = Stores.generateStoreManager("userTable");

const userByPhoneTableManager = Stores.generateStoreManager("userByPhoneTable");

class UserStore {
  static findUserByPhone(phone) {
    const userTable = userTableManager.read();
    const userByPhoneTable = userByPhoneTableManager.read();
    const index = userByPhoneTable.get(phone);
    const user = Optional.ofNullable(userTable[index]);
    if (user.isPresent()) {
      return Optional.of({ ...user.get() });
    }
    return Optional.empty();
  }

  static save(user) {
    userTableManager.apply((userTable) => {
      userByPhoneTableManager.apply((userByPhoneTable) => {
        const index = userTable.length;
        userTable.push(user);
        userByPhoneTable.set(user.phone, index);
      });
    });
  }
}

export { UserStore };
