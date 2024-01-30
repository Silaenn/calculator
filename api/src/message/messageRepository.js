const prisma = require("../db");

const findMessages = async () => {
  const message = await prisma.user.findMany();

  return message;
};

const insertMessage = async (messageData) => {
  const message = await prisma.user.create({
    data: {
      email: messageData.email,
      content: messageData.content,
    },
  });

  return message;
};

module.exports = {
  findMessages,
  insertMessage,
};
