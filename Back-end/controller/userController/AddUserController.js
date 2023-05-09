// For addUser operation
const addUser = require("../../models/users/addUser");

class AddUserController {
  async addUser(req, res) {
    const { Name, Email, Password, Phone } = req.body;
    try {
      await addUser(Name, Email, Password, Phone);
      res.status(201).json({ message: "the user was added to the Queue" });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}
module.exports = AddUserController;
