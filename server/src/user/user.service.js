import sha256 from "crypto-js/sha256.js";
import * as jose from "jose";
import { promises as fs } from "fs";
import Optional from "optional-js";
import { UserStore } from "./user.store.js";
import { Objects } from "../utils/objects.utils.js";
import { SecretState } from "../state/secret.state.js";
import { Length } from "../utils/length.utils.js";

const APP = "amigo::secreto::server";
const JWT_ALG = "HS256";
const ISSUER = `${APP}:issuer`;
const AUDIENCE = `${APP}:user`;

class UserService {
  static async login(login) {
    const user = UserStore.findUserByPhone(login.phone);
    if (user.isPresent()) {
      const isValidLogin = _validateLogin(user.get(), login.password);
      if (isValidLogin) {
        const token = await _createLoginToken(user.get());
        return Optional.of({
          name: user.get().name,
          phone: user.get().phone,
          token: token,
        });
      }
    }
    return Optional.empty();
  }

  static register(user) {
    const existingUser = UserStore.findUserByPhone(user.phone);
    if (existingUser.isPresent()) {
      return false;
    }
    user.password = _encryptPassword(user.password);
    UserStore.save(user);
    return true;
  }

  static async getUserFromToken(jwt) {
    const payload = await _verifyLoginToken(jwt);

    if (payload.isPresent()) {
      const phone = payload.get().sub;
      const user = UserStore.findUserByPhone(phone);
      if (user.isPresent()) {
        delete user.get().password;
        return user;
      }
    }

    return Optional.empty();
  }

  static isValidLogin(login) {
    return (
      Objects.isNotEmpty(login) &&
      Objects.isNotEmpty(login.phone) &&
      Objects.isString(login.phone) &&
      Length.isEqual(login.phone, 11) &&
      Objects.isNotEmpty(login.password) &&
      Objects.isString(login.password) &&
      Length.isGreaterOrEqual(login.password, 8)
    );
  }

  static isValidUser(user) {
    return (
      Objects.isNotEmpty(user) &&
      Objects.isNotEmpty(user.name) &&
      Objects.isString(user.name) &&
      Objects.isNotEmpty(user.phone) &&
      Objects.isString(user.phone) &&
      Length.isEqual(user.phone, 11) &&
      Objects.isNotEmpty(user.password) &&
      Objects.isString(user.password) &&
      Length.isGreaterOrEqual(user.password, 8)
    );
  }
}

function _validateLogin(user, password) {
  const encryptedPassword = _encryptPassword(password);
  return user.password === encryptedPassword;
}

function _encryptPassword(password) {
  return sha256(password).toString();
}

async function _createLoginToken(user) {
  const jwt = await new jose.SignJWT({})
    .setSubject(user.phone)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime("2h")
    .sign(SecretState.userSecret);
  return jwt;
}

async function _verifyLoginToken(jwt) {
  try {
    const { payload } = await jose.jwtVerify(jwt, SecretState.userSecret, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return Optional.ofNullable(payload);
  } catch (e) {
    return Optional.empty();
  }
}

export { UserService };
