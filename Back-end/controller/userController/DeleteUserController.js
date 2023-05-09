const deleteUser = require("../../models/users/deleteUser");
// For deleteUser operation
class DeleteUserController {
  async deleteUser(req, res) {
    const id = req.params.Id;
    try {
      const result = await deleteUser(id);
      if (result === null) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "User deleted from the Queue" });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
module.exports = DeleteUserController;
