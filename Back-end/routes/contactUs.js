const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const connection = require("../db/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

// Send message API endpoint
router.post(
  "/",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address"),
    body("subject").trim().not().isEmpty().withMessage("Subject is required"),
    body("message").trim().not().isEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, subject, message } = req.body;

      // Save message to database
      await query(
        `INSERT INTO contact_us (Name, Email, Subject, Message) VALUES ('${name}', '${email}', '${subject}', '${message}')`
      );
      // Create a transporter with your email service provider's API
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "mo5les75291@gmail.com",
          pass: "rroguhbeepkwaomc",
        },
      });

      //Define your email message
      const mailOptions = {
        from: "",
        to: "mo5les75291@gmail.com",
        subject: subject,
        text: name + "\n" + message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: "Error sending message, please try again later",
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.json({ msg: "Message sent successfully"  });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({errors:[{msg: "Internal Server Error"}]  });
    }
  }
);

module.exports = router;
