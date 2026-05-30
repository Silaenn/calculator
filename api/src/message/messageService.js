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
  // 1. Save to DB first to ensure we don't lose the feedback
  const message = await insertMessage(messageData);

  // 2. Send email asynchronously or catch error so it doesn't block the response
  try {
    await sendEmail(messageData);
  } catch (error) {
    console.error(`[Email] Failed to send notification: ${error.message}`);
  }

  return message;
};

module.exports = {
  getAllMessage,
  createMessage,
};
