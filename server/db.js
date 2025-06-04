const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.PG_PASSWORD || "giorgi",
  host: "localhost",
  port: 5432,
  database: "kiurent",
});

module.exports = pool;

