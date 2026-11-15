const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

function query(text, parameters = []) {
  return pool.query(text, parameters);
}

function close() {
  return pool.end();
}

module.exports = {
  query,
  close,
};
