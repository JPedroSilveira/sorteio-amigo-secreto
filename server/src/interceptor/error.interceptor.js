import HttpStatus from "http-status";

class ErrorInterceptor {
  static setup(app) {
    app.use((err, _, res, next) => {
      console.error(err.stack);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    });
  }
}

export { ErrorInterceptor };
