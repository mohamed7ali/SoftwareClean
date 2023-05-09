const connection = require("../../db/connection");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");

async function updateUser(Id, Name, Email, Phone, Password, req) {
  try {
    await validateUserUpdate(Name, Email, Phone, Password, req);
    const query =
      "UPDATE user SET Name = ?, Email = ?, Phone = ?, Password = ?, verification_token = ? WHERE Id = ?";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    const verificationToken = crypto.randomBytes(20).toString("hex");
    await util
      .promisify(connection.query)
      .call(connection, query, [
        Name,
        Email,
        Phone,
        hashedPassword,
        verificationToken,
        Id,
      ]);
    console.log([Name, Email, Phone, hashedPassword, verificationToken, Id]);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function validateUserUpdate(Name, Email, Phone, Password, req) {
  await body(Name).notEmpty().withMessage("Name is required");
  await body(Email).isEmail().withMessage("Invalid Email");
  await body(Phone).isMobilePhone().withMessage("Invalid Phone number");
  await body(Password)
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error();
  }
}

module.exports = updateUser;