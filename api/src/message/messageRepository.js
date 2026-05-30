const { client, ensureDb } = require("../db");

const findMessages = async () => {
  await ensureDb();
  const result = await client.execute(
    "SELECT id, email, content FROM messages ORDER BY id DESC"
  );
  return result.rows;
};

const insertMessage = async (messageData) => {
  await ensureDb();
  const inserted = await client.execute({
    sql: "INSERT INTO messages (email, content) VALUES (?, ?)",
    args: [messageData.email, messageData.content],
  });

  const id = Number(inserted.lastInsertRowid);
  const result = await client.execute({
    sql: "SELECT id, email, content FROM messages WHERE id = ?",
    args: [id],
  });

  return result.rows[0];
};

module.exports = {
  findMessages,
  insertMessage,
};
