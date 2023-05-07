const util = require("util");
const connection = require("../db/connection");
const query = util.promisify(connection.query).bind(connection);

const checkUserStatus = async (req, res, next) => {
  const Id = req.headers.id;
  try {
    // Fetch user status from the database
    const userStatus = await query(`SELECT Status FROM user WHERE Id=${Id}`);
    if (userStatus.length === 0) {
      // User not found in database
      return res.status(401).json({ message: "User not found!" });
    }
    if (userStatus[0].Status !== 1) {
      // User is not allowed to add questions
      return res.status(401).json({ message: "You are not authorized" });
    }
    // User is allowed to add questions
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = checkUserStatus;
