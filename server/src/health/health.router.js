import { HealthController } from "./health.controller.js";

const root = "/health";

class HealthRouter {
  static createRoutes(app) {
    app.get(`${root}`, HealthController.check);
  }
}

export { HealthRouter };
