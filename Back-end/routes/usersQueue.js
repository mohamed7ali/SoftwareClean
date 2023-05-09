const express = require("express");
const UserQueueController = require("../controller/userQueueController");
const router = express.Router();
const userQueueController = new UserQueueController();

router.get("/", userQueueController.getAllUsers.bind(userQueueController));
router.post("/:Id", userQueueController.registerUser.bind(userQueueController));
router.delete("/:Id", userQueueController.deleteUser.bind(userQueueController));

module.exports = router;