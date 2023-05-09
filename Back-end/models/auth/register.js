const { body } = require("express-validator");

module.exports = [
  body("Name").notEmpty().withMessage("Name is required"),
  body("Email").isEmail().withMessage("Invalid Email"),
  body("Phone").isMobilePhone().withMessage("Invalid Phone number"),
  body("Password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("Status"),
];