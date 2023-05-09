const connection = require("../../db/connection");
const util = require("util");

async function getUserById(Id) {
  try {
    const query = "SELECT * FROM user WHERE Id = ?";
    const rows = await util.promisify(connection.query).bind(connection, query, [Id]);
    if (rows.length === 0) {
      return null;
    } else {
      return rows[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getUserById;