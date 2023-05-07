const router = require("express").Router();
const connection = require("../db/connection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Get all users
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM user", (error, rows, fields) => {
      res.json(rows);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Add a new user
router.post("/", (req, res) => {
  const { Name, Email, Password, Phone } = req.body;
  try {
    connection.query(
      "INSERT INTO user set ?",
      {
        Name: Name,
        Email: Email,
        Password: Password,
        Phone: Phone,
      },
      (err, result, fields) => {
        res.status(201).json({ message: "the user was added to the Queue" });
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Get a user by ID
router.get("/:Id", (req, res) => {
  try {
    const { Id } = req.params;
    connection.query(
      "SELECT * FROM user WHERE ?",
      { Id: Id },
      (error, result, fields) => {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.sendStatus(404);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Update a user by ID
router.put(
  "/:Id",
  body("Name").notEmpty().withMessage("Name is required"),
  body("Email").isEmail().withMessage("Invalid Email"),
  body("Phone").isMobilePhone().withMessage("Invalid Phone number"),
  body("Password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { Name, Email, Phone, Password } = req.body;
    try {
      // Hash the Password.
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Password, saltRounds);
      // Generate random token for Email verification.
      const verificationToken = crypto.randomBytes(20).toString("hex");
      // Update the user.
      await util
        .promisify(connection.query)
        .call(
          connection,
          "UPDATE user SET Name = ?, Email = ?, Password = ?, Phone = ?, verification_token = ? WHERE Id = ?",
          [Name, Email, hashedPassword, Phone, verificationToken, req.params.Id]
        );
      res.status(200).json({ msg: "User updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "Internal Server error" }] });
    }
  }
);

// Delete a user by ID
router.delete("/:Id", async (req, res) => {
  try {
    connection.query(
      "DELETE FROM user WHERE Id = ?",
      [req.params.Id],
      (error, result, fields) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(202).json({ message: "User deleted from the Queue" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
module.exports = router;
