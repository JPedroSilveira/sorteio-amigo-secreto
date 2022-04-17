import { GroupController } from "./group.controller.js";

const root = "/group";

class GroupRouter {
  static createRoutes(app) {
    app.post(`${root}`, GroupController.create);
    app.put(`${root}`, GroupController.update);
    app.delete(`${root}`, GroupController.delete);
    app.get(`${root}`, GroupController.get);
    app.get(`${root}/all`, GroupController.getAll);
    app.put(`${root}/sort`, GroupController.sort);
    app.put(`${root}/wishes`, GroupController.saveWishes);
  }
}

export { GroupRouter };
