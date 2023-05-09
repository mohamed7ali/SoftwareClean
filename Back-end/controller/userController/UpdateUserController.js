const updateUser = require("../../models/users/updateUser");
// For updateUser operation
class UpdateUserController {
  async updateUser(req, res) {
    const Id = req.params.Id;
    const { Name, Email, Phone, Password } = req.body;
    try {
      await updateUser(Id, Name, Email, Phone, Password, req);
      res.status(200).json({ message: "User updated" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errors: [{ msg: "Bad Request" }] });
    }
  }
}
module.exports = UpdateUserController;
