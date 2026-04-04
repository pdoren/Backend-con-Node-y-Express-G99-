const { Pool } = require("pg");

// ---------- Conexión DB ----------
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "softjobs",
  port: 5433,
});

module.exports = pool;