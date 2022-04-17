const path = require("path");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/server/health", health);

async function health(req, res) {
  res.status(200).send("Ok");
}

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
