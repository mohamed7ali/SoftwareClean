const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const util = require("util");
const connection = require("../db/connection");

class AuthController {
  register() {
    return [
      body("Name").notEmpty().withMessage("Name is required"),
      body("Email").isEmail().withMessage("Invalid Email"),
      body("Phone").isMobilePhone().withMessage("Invalid Phone number"),
      body("Password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      body("Status"),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const { Name, Email, Phone, Password, Status } = req.body;

          const userExists = await this.checkUserExists(Email, Phone);
          if (userExists) {
            return res.status(202).json({
              errors: [
                {
                  msg: "User already exists with the given Email or Phone number",
                },
              ],
            });
          }

  const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(Password, saltRounds);

          const verificationToken = crypto.randomBytes(20).toString("hex");

          if (Status) {
            await this.insertUser(
              "user",
              [Name, Email, Phone, hashedPassword, verificationToken, Status]
            );
            res.status(200).json({
              message: "The Admin was added to the table.",
            });
          } else {
            await this.insertUser(
              "user_queue",
              [Name, Email, Phone, hashedPassword, verificationToken, Status]
            );
            res.status(200).json({
              message: "The user was added to the queue, please Wait for Admin To Confirm",
            });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ errors: [{ msg: "Internal server error" }] });
        }
      },
    ];
  }

  async checkUserExists(email, phone) {
    const query = "SELECT Id FROM user WHERE Email = ? OR Phone = ?";
    const rows = await util.promisify(connection.query).call(connection, query, [
      email,
      phone,
    ]);
    return rows.length > 0;
  }

  async insertUser(table, values) {
    const query = `INSERT INTO ${table} (Name, Email, Phone, Password, verification_token, Status) VALUES (?, ?, ?, ?, ?, ?)`;
    await util.promisify(connection.query).call(connection, query, values);
  }

  async loginUser(req, res) {
    const { Email, Password } = req.body;

    // Check if Email and password are provided
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email and password are required" }] });
    }

    try {
      // QUERY ON USER TABLE
      const rowFromUser = await this.getUserByEmail(Email);
      // QUERY ON USER_QUEUE TABLE
      const rowsFromUserQueue = await this.getUserQueueByEmail(Email);
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
      const passwordMatch = await bcrypt.compare(
        req.body.Password,
        user.Password
      );

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
  }

  async getUserByEmail(email) {
    const query = "SELECT * FROM user WHERE Email = ?";
    const rows = await util
      .promisify(connection.query)
      .call(connection, query, [email]);
    return rows;
  }

  async getUserQueueByEmail(email) {
    const query = "SELECT * FROM user_queue WHERE Email = ?";
    const rows = await util
      .promisify(connection.query)
      .call(connection, query, [email]);
    return rows;
  }
}

module.exports = new AuthController();