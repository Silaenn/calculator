const express = require("express");
const nodemailer = require("nodemailer");
const { getAllMessage, createMessage } = require("./messageService");

const router = express.Router();

// Handle GET request to fetch all messages
router.get("/", async (req, res) => {
  try {
    const messages = await getAllMessage();
    res.send(messages);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST request to create a new message and send email
router.post("/", async (req, res) => {
  const newMessage = req.body;

  if (!newMessage.email || !newMessage.content) {
    return res.status(400).send({ message: "Email and content are required" });
  }

  try {
    // Send email
    await sendEmail(newMessage);

    // Create message in the database
    const message = await createMessage(newMessage);

    res.status(201).send({
      data: message,
      message: "create message success",
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Function to send email
async function sendEmail(messageData) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER or EMAIL_PASS not set in environment variables");
    throw new Error("Email configuration is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: messageData.email,
    to: process.env.EMAIL_USER,
    subject: "Feedback dari " + messageData.email,
    text: messageData.content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email terkirim: " + info.response);
  } catch (error) {
    console.error("Gagal kirim email:", error);
    throw new Error("Failed to send email: " + error.message);
  }
}

module.exports = router;
