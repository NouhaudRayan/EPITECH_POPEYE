const mysql = require("mysql2/promise");
require("dotenv").config();

async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = { query };
