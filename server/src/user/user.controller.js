import HttpStatus from "http-status";
import { AuthHandler } from "../handler/auth.handler.js";
import { UserService } from "./user.service.js";

class UserController {
  static async login(req, res) {
    const login = req.body;
    if (UserService.isValidLogin(login)) {
      const token = await UserService.login(login);
      if (token.isPresent()) {
        res.status(HttpStatus.OK).json({
          key: token.get(),
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  static register(req, res) {
    const user = req.body;

    if (UserService.isValidUser(user)) {
      const success = UserService.register(user);
      if (success) {
        res.status(HttpStatus.CREATED).send();
      } else {
        res.status(HttpStatus.CONFLICT).send();
      }
    } else {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  static async getCurrentUser(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      res.status(HttpStatus.OK).json(user);
    });
  }
}

export { UserController };
