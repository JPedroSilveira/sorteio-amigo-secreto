import HttpStatus from "http-status";

class HealthController {
  static check(_, res) {
    res.status(HttpStatus.OK).send();
  }
}

export { HealthController };
