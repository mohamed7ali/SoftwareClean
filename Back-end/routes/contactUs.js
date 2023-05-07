const express = require("express");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const util = require("util");

const connection = require("../db/connection");

class ContactController {
  sendMessage() {
    return [
      body("name").trim().not().isEmpty().withMessage("Name is required"),
      body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address"),
      body("subject")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Subject is required"),
      body("message").trim().not().isEmpty().withMessage("Message is required"),
      async (req, res) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const { name, email, subject, message } = req.body;

          await this.saveMessage(name, email, subject, message);

          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "mo5les75291@gmail.com",
              pass: "rroguhbeepkwaomc",
            },
          });

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
              return res.json({ msg: "Message sent successfully" });
            }
          });
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ errors: [{ msg: "Internal Server Error" }] });
        }
      },
    ];
  }

  async saveMessage(name, email, subject, message) {
    const query = `INSERT INTO contact_us (Name, Email, Subject, Message) VALUES ('${name}', '${email}', '${subject}', '${message}')`;
    await util.promisify(connection.query).bind(connection, query);
  }
}

const contactController = new ContactController();
const router = express.Router();

router.post("/", contactController.sendMessage());

module.exports = router;
/**I created a ContactController class that contains
 *  the sendMessage method. I extracted the database
 *  operation to save the message into a separate
 *  method and reused it in the sendMessage method.
 *  I used async/await instead of callbacks to handle
 *  asynchronous operations and simplified the error
 *  handling logic using try-catch blocks.

I also removed the require("express").Router() and 
replaced it with express.Router(), which is more 
readable and concise. */