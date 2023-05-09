const getAllUsers = require("../../models/users/getAllUsers");
class GetAllUsersController {
  async getAllUsers(req, res) {
    try {
      const rows = await getAllUsers();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
module.exports = GetAllUsersController;
