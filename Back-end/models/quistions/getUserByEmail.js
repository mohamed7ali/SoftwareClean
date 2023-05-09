const { query } = require("../../db/connection");

async function getUserByEmail(email) {
  try {
    const rows = await query("SELECT * FROM user WHERE Email = ?", [email]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
  }
}

module.exports = getUserByEmail;