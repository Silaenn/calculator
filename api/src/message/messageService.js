const prisma = require("../db");

const { findMessages, insertMessage } = require("./messageRepository");

const getAllMessage = async () => {
  const message = await findMessages();

  return message;
};

const createMessage = async (newMessagetData) => {
  const message = await insertMessage(newMessagetData);

  return message;
};

module.exports = {
  getAllMessage,
  createMessage,
};
