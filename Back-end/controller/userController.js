const getAllUsers = require("../models/users/getAllUsers");
const addUser = require("../models/users/addUser");
const getUserById = require("../models/users/getUserById");
const updateUser = require("../models/users/updateUser");
const deleteUser = require("../models/users/deleteUser");

class UserController {
  async getAllUsers(req, res) {
    try {
      const rows = await getAllUsers();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

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

module.exports = UserController;