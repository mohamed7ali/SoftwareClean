const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const ContactController = require("../../controller/ContactController");

function sendMessage() {
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

        const contactController = new ContactController();
        await contactController.saveMessage(name, email, subject, message);

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

module.exports = sendMessage;