import HttpStatus from "http-status";

class AuthAuthenticatedHandler {
  constructor(req, res) {
    this._user = req.currentUser;
    this._res = res;
  }

  onlyIfAuthenticated(func) {
    if (this._user.isPresent()) {
      func(this._user.get());
    } else {
      this._res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}

class AuthHandler {
  static get(req, res) {
    return new AuthAuthenticatedHandler(req, res);
  }
}

export { AuthHandler };
