import fs from "fs";
import { createSecretKey } from "crypto";

class SecretState {
  static init() {
    const userPrivateKey = fs.readFileSync("./private.key", "utf8");
    this.userSecret = createSecretKey(userPrivateKey, "utf-8");
  }
}

export { SecretState };
