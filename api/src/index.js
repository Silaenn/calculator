const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Selamat datang di API akuh");
});

const messageController = require("./message/messageController");

app.use("/messages", messageController);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
  });
}

module.exports = app;
