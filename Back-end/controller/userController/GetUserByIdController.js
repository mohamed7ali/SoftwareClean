const getUserById = require("../../models/users/getUserById")
// For getUserById operation
class GetUserByIdController {
  async getUserById(req, res) {
    const id = req.params.Id;
    try {
      const row = await getUserById(id);
      if (row === null) {
        res.sendStatus(404);
      } else {
        res.json(row);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
module.exports = GetUserByIdController;
