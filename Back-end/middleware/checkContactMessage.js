const util = require("util");
const connection = require("../db/connection");
const query = util.promisify(connection.query).bind(connection);

const checkContactMessage = async (req, res, next) => {
  try {
    const Id = req.headers.id;

    const user = await query(`SELECT Status FROM user WHERE Id = '${Id}'`);
    if (user.length === 0) {
      // User not found in database
      return res.status(401).json({ message: "User not found !!" });
    }
    if (user[0].Status !== 0) {
      return res.status(401).json({
        message:
          "The Admin can't be authorized to perform this action and send a message to himself..",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkContactMessage;
