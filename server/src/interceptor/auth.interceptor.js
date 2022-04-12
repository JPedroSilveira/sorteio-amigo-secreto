import Optional from "optional-js";
import { UserService } from "../user/user.service.js";
import { ObjectUtils } from "../utils/object.utils.js";

class AuthInterceptor {
  static setup(app) {
    app.use("*", async function (req, _, next) {
      req.currentUser = Optional.empty();
      const jwt = req.header("authorization");
      if (ObjectUtils.isNotEmpty(jwt)) {
        try {
          req.currentUser = await UserService.getUserByAuthentication(jwt);
        } catch (e) {
          console.error(e);
        }
      }
      next();
    });
  }
}

export { AuthInterceptor };
