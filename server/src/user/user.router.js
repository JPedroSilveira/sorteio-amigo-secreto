import { UserController } from "./user.controller.js";

const root = "/user";

class UserRouter {
  static createRoutes(app) {
    app.post(`${root}/login`, UserController.login);
    app.post(`${root}/register`, UserController.register);
    app.get(`${root}/current`, UserController.getCurrentUser);
  }
}

export { UserRouter };
