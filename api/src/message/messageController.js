const express = require("express");
const { getAllMessage, createMessage } = require("./messageService");
const { createMessageSchema } = require("./message.schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const messages = await getAllMessage();
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // 1. Validation
    const validatedData = createMessageSchema.parse(req.body);

    // 2. Call Service
    const message = await createMessage(validatedData);

    res.status(201).json({
      success: true,
      message: "Message created and email sent successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
