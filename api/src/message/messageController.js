// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const prisma = require("../db");
const nodemailer = require("nodemailer");

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

// Fungsi untuk mengirim email
async function sendEmail(messageData) {
  // Konfigurasi transporter Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "deokeldisilaen@gmail.com",
      pass: "wes selow",
    },
  });

  // Buat pesan email
  const mailOptions = {
    from: "deokeldisilaen@gmail.com",
    to: messageData.email,
    subject: "Subject Email Anda",
    text: messageData.content,
  };

  // Kirim email
  await transporter.sendMail(mailOptions);
}

module.exports = router;
