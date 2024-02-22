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
      user: "deokeldisilaen@gmail.com",
      pass: "ttmv rhgf iujy nsvo",
    },
  });

  const mailOptions = {
    from: messageData.email,
    to: "deokeldisilaen@gmail.com",
    subject: "Subject Email Anda",
    text: messageData.content,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email terkirim: " + info.response);
    }
  });
}

module.exports = router;
