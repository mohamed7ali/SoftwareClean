const express = require("express");
const sendMessage = require("../models/cntact-us/sendMessage");

const router = express.Router();

router.post("/", sendMessage());

module.exports = router;