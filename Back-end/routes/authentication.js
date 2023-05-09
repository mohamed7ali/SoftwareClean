const express = require("express");
const router = express.Router();
const RegsterController = require("../controller/Auth/register");
const LoginController = require("../controller/Auth/login");

router.post("/register", RegsterController.register());
router.post("/login", LoginController.loginUser.bind(LoginController));

module.exports = router;