const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "giorgi",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || "kiurent",
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = pool;

