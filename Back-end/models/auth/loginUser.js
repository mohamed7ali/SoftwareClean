const bcrypt = require("bcrypt");
const util = require("util");
const connection = require("../../db/connection");
const { validationResult } = require("express-validator");
const getUserByEmail = require("./getUserByEmail");
const getUserQueueByEmail = require("./getUserQueueByEmail");

module.exports = async (req, res) => {
  const { Email, Password } = req.body;

  // Check if Email and password are provided
  if (!Email || !Password) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email and password are required" }] });
  }

  try {
    // QUERY ON USER TABLE
    const rowFromUser = await getUserByEmail(Email);
    // QUERY ON USER_QUEUE TABLE
    const rowsFromUserQueue = await getUserQueueByEmail(Email);

    if (rowsFromUserQueue.length) {
      return res.status(401).json({
        errors: [{ msg: "Your Email does not confirm by the admin yet." }],
      });
    } else if (!rowFromUser.length) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Your Email does not exist in database." }] });
    }

    const user = rowFromUser[0];
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({
        errors: [{ msg: " Your Password Incorrect!" }],
      });
    }

    const token = user.verification_token;

    res.json({
      msg: "login successfully",
      token: token,
      name: user.Name,
      id: user.Id,
      status: user.Status,
      Email: user.Email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};