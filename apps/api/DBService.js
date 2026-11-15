const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

async function initialize() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id BIGSERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

function query(text, parameters = []) {
  return pool.query(text, parameters);
}

function close() {
  return pool.end();
}

module.exports = {
  initialize,
  query,
  close,
};
