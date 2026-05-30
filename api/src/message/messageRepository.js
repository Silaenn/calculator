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

  // Turso returns lastInsertRowid as a BigInt, we convert it to Number or String
  const id = inserted.lastInsertRowid ? inserted.lastInsertRowid.toString() : Date.now().toString();

  return {
    id,
    ...messageData
  };
};

module.exports = {
  findMessages,
  insertMessage,
};
