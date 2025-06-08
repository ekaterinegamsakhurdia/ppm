const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "giorgi",
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || "kiurent",
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 20, // Default is 10
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;

