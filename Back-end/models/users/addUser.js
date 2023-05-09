const connection = require("../../db/connection");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function addUser(Name, Email, Password, Phone) {
  try {
    const query = "INSERT INTO user SET ?";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    const verificationToken = crypto.randomBytes(20).toString("hex");
    await util.promisify(connection.query).bind(connection, query, {
      Name: Name,
      Email: Email,
      Password: hashedPassword,
      Phone: Phone,
      verification_token: verificationToken,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = addUser;