const connection = require("../../db/connection");
const util = require("util");

async function deleteUser(Id) {
  try {
    const query = "DELETE FROM user WHERE Id = ?";
    const result = await util.promisify(connection.query).bind(connection, query, [Id]);
    if (result.affectedRows === 0) {
      return null;
    } else {
      return result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = deleteUser;