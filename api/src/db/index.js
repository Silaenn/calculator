const { createClient } = require("@libsql/client");

const url = process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("Missing DATABASE_URL.");
}

const client = createClient({ url, authToken });

const initPromise = client.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    content TEXT NOT NULL
  )
`).catch(err => {
  console.error("[DB] Initialization Error:", err.message);
  throw err;
});

const ensureDb = async () => {
  await initPromise;
};

module.exports = {
  client,
  ensureDb,
};
