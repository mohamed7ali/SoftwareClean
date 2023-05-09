const express = require("express");
const AddUserController = require("../controller/userController/AddUserController");
const DeleteUserController = require("../controller/userController/DeleteUserController");
const GetAllUsersController = require("../controller/userController/GetAllUserController");
const GetUserByIdController = require("../controller/userController/GetUserByIdController");
const UpdateUserController = require("../controller/userController/UpdateUserController");

const getAllUsersController = new GetAllUsersController();
const addUserController = new AddUserController();
const getUserByIdController = new GetUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const router = express.Router();

router.get("/", getAllUsersController.getAllUsers.bind(getAllUsersController));
router.post("/", addUserController.addUser.bind(addUserController));
router.get(
  "/:Id",
  getUserByIdController.getUserById.bind(getUserByIdController)
);
router.put("/:Id", updateUserController.updateUser.bind(updateUserController));
router.delete(
  "/:Id",
  deleteUserController.deleteUser.bind(deleteUserController)
);

module.exports = router;