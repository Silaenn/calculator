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
  // We use try/catch here because email failing shouldn't revert the DB insert
  try {
    await sendEmail(messageData);
    console.log(`[Email] Notification sent for message ${message.id}`);
  } catch (error) {
    console.error(`[Email] Failed to send notification: ${error.message}`);
    // We don't throw here so the user gets a success response since it was saved to DB
  }

  return message;
};

module.exports = {
  getAllMessage,
  createMessage,
};
