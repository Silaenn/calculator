const express = require("express");
const doteenv = require("dotenv");
const app = express();

doteenv.config();

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Welcome API");
});

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
