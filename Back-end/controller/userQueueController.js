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

module.exports = UserQueueController;