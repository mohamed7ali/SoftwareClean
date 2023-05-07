const express = require("express");
const connection = require("../db/connection");

class UserQueueController {
  async getAllUsers(req, res) {
    try {
      const rows = await this.getAllUsersFromDb();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getAllUsersFromDb() {
    const query = "SELECT * FROM user_queue";
    const rows = await connection.query(query);
    return rows;
  }

  async registerUser(req, res) {
    const id = req.params.Id;
    try {
      const user = await this.getUserFromQueue(id);
      if (!user) {
        res.sendStatus(404);
        return;
      }
      await this.insertUserIntoDb(user);
      await this.deleteUserFromQueue(id);
      res.status(201).json({
        message: `${user.Name} has been user registered`,
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getUserFromQueue(id) {
    const query = "SELECT * FROM user_queue WHERE Id = ?";
    const rows = await connection.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }
    const user = rows[0];
    return {
      Id: user.Id,
      Name: user.Name,
      Email: user.Email,
      Phone: user.Phone,
      Status: user.Status,
      Password: user.Password,
      verification_token: user.verification_token,
    };
  }

  async insertUserIntoDb(user) {
    const query = "INSERT INTO user SET ?";
    await connection.query(query, user);
  }

  async deleteUserFromQueue(id) {
    const query = "DELETE FROM user_queue WHERE Id = ?";
    const result = await connection.query(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error(`User ${id} not found in user queue`);
    }
  }

  async deleteUser(req, res) {
    const id = req.params.Id;
    try {
      await this.deleteUserFromQueue(id);
      res.status(202).json({ message: "User deleted from the queue" });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

const userQueueController = new UserQueueController();
const router = express.Router();

router.get("/", userQueueController.getAllUsers.bind(userQueueController));
router.post("/:Id", userQueueController.registerUser.bind(userQueueController));
router.delete("/:Id", userQueueController.deleteUser.bind(userQueueController));

module.exports = router;
/** Some changes and improvements made to the code:

Created a UserQueueController class that handles all the user queue-related operations.
Each handler method of the class has a single responsibility and a clear name that reflects that responsibility.
Replaced connection.query callbacks with async/await calls to make the code more readable and easier to handle errors.
Extracted common code into separate methods (getAllUsersFromDb, getUserFromQueue, insertUserIntoDb, deleteUserFromQueue) to avoid code duplication and make the code more modular.
Used dependency injection to inject the UserQueueController instance into the router handlers, using the bind method to ensure that the this keyword inside the handlers refers to the UserQueueController instance.
Removed the commented out router.get("/:Id") handler since it wasn't being used.*/