import HttpStatus from "http-status";
import { UserService } from "./user.service.js";

class UserController {
  static async login(req, res) {
    const body = req.body;
    if (body && body.phone && body.password) {
      const token = await UserService.login(body.phone, body.password);
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
    const body = req.body;

    if (body && body.name && body.phone && body.password) {
      const success = UserService.register(
        body.name,
        body.phone,
        body.password
      );
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
    const jwt = req.header("Authorization");
    const user = await UserService.getCurrentUser(jwt);
    if (user.isPresent()) {
      res.status(HttpStatus.CREATED).json(user.get());
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}

export { UserController };
