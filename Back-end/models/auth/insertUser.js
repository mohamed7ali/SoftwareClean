const util = require("util");
const connection = require("../../db/connection");

module.exports = async (table, values) => {
  const query = `INSERT INTO ${table} (Name, Email, Phone, Password, verification_token, Status) VALUES (?, ?, ?, ?, ?, ?)`;
  await util.promisify(connection.query).call(connection, query, values);
};