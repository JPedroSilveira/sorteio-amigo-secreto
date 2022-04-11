import sha256 from "crypto-js/sha256.js";
import * as jose from "jose";
import { createSecretKey } from "crypto";
import { promises as fs } from "fs";
import Optional from "optional-js";
import { UserStore } from "./user.store.js";

const APP = "amigo::secreto::server";
const JWT_ALG = "HS256";
const ISSUER = `${APP}:issuer`;
const AUDIENCE = `${APP}:user`;

class UserService {
  static async login(phone, password) {
    const user = UserStore.findUserByPhone(phone);
    if (user.isPresent()) {
      const isValidLogin = Private.validateLogin(user.get(), password);
      if (isValidLogin) {
        const token = await Private.createLoginToken(phone);
        return Optional.of(token);
      }
    }
    return Optional.empty();
  }

  static register(name, phone, password) {
    const user = UserStore.findUserByPhone(phone);
    if (user.isPresent()) {
      return false;
    }
    const encryptedPassoword = Private.encryptPassword(password);
    UserStore.save(name, phone, encryptedPassoword);
    return true;
  }

  static async getCurrentUser(jwt) {
    const secretKey = await Private.getSecretKey();

    const { payload } = await jose.jwtVerify(jwt, secretKey, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });

    if (payload) {
      const phone = payload.sub;
      const user = UserStore.findUserByPhone(phone);
      if (user.isPresent()) {
        user.get().encryptedPassword = undefined;
        return user;
      }
    }

    return Optional.empty();
  }
}

class Private {
  static validateLogin(user, password) {
    const encryptedPassword = Private.encryptPassword(password);
    return user.encryptedPassword === encryptedPassword;
  }

  static encryptPassword(password) {
    return sha256(password).toString();
  }

  static async createLoginToken(phone) {
    const secretKey = await Private.getSecretKey();
    const jwt = await new jose.SignJWT({})
      .setSubject(phone)
      .setProtectedHeader({ alg: JWT_ALG })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setExpirationTime("2h")
      .sign(secretKey);
    return jwt;
  }

  static async getSecretKey() {
    const secretHash = await fs.readFile("./private.key", "utf8");
    const secretKey = createSecretKey(secretHash, "utf-8");
    return secretKey;
  }
}

export { UserService };
