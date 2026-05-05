const nodemailer = require("nodemailer");
const config = require("../config");
const { findMessages, insertMessage } = require("./messageRepository");

const getAllMessage = async () => {
  return await findMessages();
};

const sendEmail = async (messageData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  const mailOptions = {
    from: config.email.user,
    replyTo: messageData.email,
    to: config.email.user,
    subject: `Feedback dari ${messageData.email}`,
    text: messageData.content,
  };

  return await transporter.sendMail(mailOptions);
};

const createMessage = async (messageData) => {
  // 1. Send email first (if it fails, we might want to know)
  await sendEmail(messageData);

  // 2. Save to DB
  const message = await insertMessage(messageData);

  return message;
};

module.exports = {
  getAllMessage,
  createMessage,
};
