const prisma = require("../db");

const { findMessages, insertMessage } = require("./messageRepository");

const getAllMessage = async () => {
  const message = await findMessages();

  return message;
};

const createMessage = async (messageData) => {
  const message = await insertMessage(messageData);

  return message;
};

module.exports = {
  getAllMessage,
  createMessage,
};
