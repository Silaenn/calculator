// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const prisma = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const message = await getAllMessage();

  res.send(message);
});

router.post("/", async (req, res) => {
  try {
    const newMessage = req.body;

    const message = await createMessage(newMessage);

    res.send({
      data: message,
      message: "create message success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const { getAllMessage, createMessage } = require("./messageService");

module.exports = router;
