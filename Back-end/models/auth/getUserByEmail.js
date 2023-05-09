const util = require("util");
const connection = require("../../db/connection");

module.exports = async (email) => {
  const query = "SELECT * FROM user WHERE Email = ?";
  const rows = await util
    .promisify(connection.query)
    .call(connection, query, [email]);
  return rows;
};