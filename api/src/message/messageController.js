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
    res.status(400).send(error.message);
  }
});

// Function to send email
async function sendEmail(messageData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: messageData.email,
    to: process.env.EMAIL_USER,
    subject: "Feedback dari " + messageData.email,
    text: messageData.content,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email terkirim: " + info.response);
  } catch (error) {
    console.error("Gagal kirim email:", error);
    throw error;
  }
}

module.exports = router;
