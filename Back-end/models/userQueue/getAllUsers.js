const connection = require("../../db/connection");

async function getAllUsers() {
  const query = "SELECT * FROM user_queue";
  const rows = await connection.query(query);
  return rows;
}

module.exports = getAllUsers;