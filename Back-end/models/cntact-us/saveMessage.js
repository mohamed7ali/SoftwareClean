const util = require("util");
const connection = require("../../db/connection");

async function saveMessage(name, email, subject, message) {
  const query = `INSERT INTO contact_us (Name, Email, Subject, Message) VALUES ('${name}', '${email}', '${subject}', '${message}')`;
  await util.promisify(connection.query).bind(connection, query);
}

module.exports = saveMessage;