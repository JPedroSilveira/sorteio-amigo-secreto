import HttpStatus from "http-status";
import Optional from "optional-js";
import { UserService } from "../user/user.service.js";
import { Objects } from "../utils/objects.utils.js";

class AuthAuthenticatedHandler {
  constructor(req, res) {
    this._res = res;
    this._req = req;
  }

  async onlyIfAuthenticated(func) {
    const user = await Private.getUserFromRequest(this._req);
    if (user.isPresent()) {
      func(user.get());
    } else {
      this._res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}

class Private {
  static getUserFromRequest(req) {
    const jwt = req.header("authorization");
    if (Objects.isNotEmpty(jwt)) {
      try {
        return UserService.getUserFromToken(jwt);
      } catch (e) {
        console.error(e);
      }
    }
    return Optional.empty();
  }
}

class AuthHandler {
  static get(req, res) {
    return new AuthAuthenticatedHandler(req, res);
  }
}

export { AuthHandler };
