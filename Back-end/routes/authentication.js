const router = require("express").Router();
const connection = require("../db/connection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Register a new user, added to the user_queue table
router.post(
  "/register",
  body("Name").notEmpty().withMessage("Name is required"),
  body("Email").isEmail().withMessage("Invalid Email"),
  body("Phone").isMobilePhone().withMessage("Invalid Phone number"),
  body("Password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    body("Status"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Name, Email, Phone, Password, Status } = req.body;

    try {
      // Check if user already exists in user_queue
      const userInqueue = await util
        .promisify(connection.query)
        .call(
          connection,
          "SELECT Id FROM user WHERE Email = ? OR Phone = ?",
          [Email, Phone]
        );
      if (userInqueue.length > 0) {
        return res.status(200).json({
          errors: [
            {
              msg: "You are in watting list, wait...",
            },
          ],
        });
      }
      // Check if user already exists with the given Email or Phone number
      const userExists = await util
        .promisify(connection.query)
        .call(connection, "SELECT Id FROM user WHERE Email = ? OR Phone = ?", [
          Email,
          Phone,
        ]);
      if (userExists.length > 0) {
        return res.status(202).json({
          errors: [
            {
              msg: "User already exists with the given Email or Phone number",
            },
          ],
        });
      }

      // Hash the Password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Password, saltRounds);

      // Generate random token for Email verification
      const verificationToken = crypto.randomBytes(20).toString("hex");

      // Insert the user into the user_queue table
      if (Status) {
        await util
          .promisify(connection.query)
          .call(
            connection,
            "INSERT INTO user (Name, Email, Phone, Password, verification_token, Status) VALUES (?, ?, ?, ?, ?, ?)",
            [Name, Email, Phone, hashedPassword, verificationToken, Status]
          );
        res.status(200).json({
          message: "The Admin was added to the table.",
        });
      } else {
        await util
          .promisify(connection.query)
          .call(
            connection,
            "INSERT INTO user_queue (Name, Email, Phone, Password, verification_token, Status) VALUES (?, ?, ?, ?, ?,?)",
            [Name, Email, Phone, hashedPassword, verificationToken,Status]
          );
      }

      res.status(200).json({
        message:
          "The user was added to the queue, please Wait for Admin To Confirm",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Internal server error" }] });
    }
  }
);

// Login route
router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  // Check if Email and password are provided
  if (!Email || !Password) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Email and password are required" }] });
  }
  try {
    // QUERY ON USER TABLE
    const queryOnUser = "SELECT * FROM user WHERE Email = ?";
    const rowFromUser = await util
      .promisify(connection.query)
      .call(connection, queryOnUser, [Email]);
    // QUERY ON USER_QUEUE TABLE
    const queryOnUserQueue = "SELECT * FROM user_queue WHERE Email = ?";
    const rowsFromUserQueue = await util
      .promisify(connection.query)
      .call(connection, queryOnUserQueue, [Email]);

    // ERSPONSE FROM TWO TABLE
    // Check if user exists in the user_queue table.
    if (rowsFromUserQueue.length) {
      return res.status(401).json({
        errors: [{ msg: "Your Email does not confirm by the admin yet." }],
      });
    }
    // Check if user exists in the user table.
    else if (!rowFromUser.length) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Your Email does not exist in database." }] });
    }

    const user = rowFromUser[0];

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        errors: [
          {
            msg: " Your Password Incorrect!",
          },
        ],
      });
    }

    // Get token
    const token = user.verification_token;
    // Send token in response and user info.
    res.json({
      msg: "login successfully",
      token: token,
      name: user.Name,
      id: user.Id,
      status: user.Status,
      Email:user.Email
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;
