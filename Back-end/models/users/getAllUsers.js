const connection = require("../../db/connection");
const util = require("util");

async function getAllUsers() {
  try {
    const query = "SELECT * FROM user";
    const rows = await util.promisify(connection.query).bind(connection, query);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getAllUsers;