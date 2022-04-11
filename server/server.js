import express from "express";
import { HealthRouter } from "./health/health.router.js";
import { UserRouter } from "./user/user.router.js";
import http from "http";

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("hello world");
});
HealthRouter.createRoutes(app);
UserRouter.createRoutes(app);

const port = process.env.PORT || 3001;
http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
