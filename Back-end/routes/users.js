const express = require("express");
const UserController = require("../controller/userController");
const userController = new UserController();
const router = express.Router();

router.get("/", userController.getAllUsers.bind(userController));
router.post("/", userController.addUser.bind(userController));
router.get("/:Id", userController.getUserById.bind(userController));
router.put("/:Id", userController.updateUser.bind(userController));
router.delete("/:Id", userController.deleteUser.bind(userController));

module.exports = router;