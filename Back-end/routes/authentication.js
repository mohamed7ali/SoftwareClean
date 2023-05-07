const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const util = require("util");

const connection = require("../db/connection");

class UserController {
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
              message:
                "The user was added to the queue, please Wait for Admin To Confirm",
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

  async login(req, res) {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email and password are required" }] });
    }

    try {
      const user = await this.getUser(Email);

      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Your Email does not exist in database." }] });
      }

      if (user.Status === 0) {
        return res.status(401).json({
          errors: [{ msg: "Your Email does not confirm by the admin yet." }],
        });
      }

      const passwordMatch = await bcrypt.compare(Password, user.Password);
      if (!passwordMatch) {
        return res.status(401).json({
          errors: [
            {
              msg: " Your Password Incorrect!",
            },
          ],
        });
      }

      const token = user.verification_token;
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
  }

  async getUser(email) {
    const query = "SELECT * FROM user WHERE Email = ?";
    const rows = await util.promisify(connection.query).call(connection, query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }
}

const userController = new UserController();
const router = express.Router();

router.post("/register", userController.register());
router.post("/login", userController.login.bind(userController));

module.exports = router;
/**I created a UserController class that contains 
 * the register and login methods. I also extracted
 *  some methods to handle database operations and 
 * reused them in the register and login methods. 
 * I used async/await instead of callbacks to handle
 *  asynchronous operations and simplified the error 
 * handling using try/catch blocks. I also renamed 
 * some variables and methods to make them more 
 * descriptive and followed the SOLID principles by 
 * separating concerns and creating a single 
 * responsibility class. Finally, I bound the login
 *  method to the UserController instance to 
 * access its properties and methods. */