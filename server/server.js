import http from "http";
import express from "express";
import { HealthRouter } from "./src/health/health.router.js";
import { UserRouter } from "./src/user/user.router.js";
import { GroupRouter } from "./src/group/group.router.js";
import { AuthInterceptor } from "./src/interceptor/auth.interceptor.js";
import { SecretState } from "./src/state/secret.state.js";
import { ErrorInterceptor } from "./src/interceptor/error.interceptor.js";

const app = express();

app.use(express.json());

SecretState.init();

AuthInterceptor.setup(app);

HealthRouter.createRoutes(app);
UserRouter.createRoutes(app);
GroupRouter.createRoutes(app);

ErrorInterceptor.setup(app);

const port = process.env.PORT || 3001;
http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
