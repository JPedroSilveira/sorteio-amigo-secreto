import HttpStatus from "http-status";
import { AuthHandler } from "../handler/auth.handler.js";
import { Objects } from "../utils/objects.utils.js";
import { GroupService } from "./group.service.js";

class GroupController {
  static create(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const group = req.body;
      if (GroupService.isValidGroup(group)) {
        const groupId = GroupService.save(group, user);
        res.status(HttpStatus.OK).json({
          id: groupId,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    });
  }

  static update(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const group = req.body;
      if (
        GroupService.isValidGroup(group) &&
        GroupService.isValidGroupForUpdate(group)
      ) {
        const success = GroupService.update(group, user);
        if (success) {
          res.status(HttpStatus.OK).send();
        } else {
          res.status(HttpStatus.NOT_FOUND).send();
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    });
  }

  static delete(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const groupId = req.query.id;
      if (Objects.isNotEmpty(groupId)) {
        const success = GroupService.delete(groupId, user);
        if (success) {
          res.status(HttpStatus.OK).send();
        } else {
          res.status(HttpStatus.NOT_FOUND).send();
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    });
  }

  static getAll(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const groups = GroupService.getAll(user);
      res.status(HttpStatus.OK).json(groups);
    });
  }

  static get(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const groupId = req.query.id;
      if (Objects.isNotEmpty(groupId)) {
        const group = GroupService.get(groupId, user);
        if (group.isPresent()) {
          res.status(HttpStatus.OK).json(group.get());
        } else {
          res.status(HttpStatus.NOT_FOUND).send();
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    });
  }

  static sort(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const groupId = req.query.id;
      if (Objects.isNotEmpty(groupId)) {
        const success = GroupService.sort(groupId, user);
        if (success) {
          res.status(HttpStatus.OK).send();
        } else {
          res.status(HttpStatus.NOT_FOUND).send();
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    });
  }

  static saveWishes(req, res) {
    AuthHandler.get(req, res).onlyIfAuthenticated((user) => {
      const groupId = req.query.id;
      const wishes = req.body.wishes;
      if (Objects.isNotEmpty(groupId)) {
        const success = GroupService.saveWishes(groupId, wishes, user);
        if (success) {
          res.status(HttpStatus.OK).send();
        } else {
          res.status(HttpStatus.NOT_FOUND).send();
        }
      } else {
        res.status(HttpStatus.BAD_REQUEST).send();
      }
    });
  }
}

export { GroupController };
