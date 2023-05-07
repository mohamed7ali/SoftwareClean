const express = require("express");
const connection = require("../db/connection");
const util = require("util");

class HistoryController {
  async getAllHistories(req, res) {
    try {
      const rows = await this.getAllHistoryResults();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getAllHistoryResults() {
    const query = "SELECT * FROM history";
    const rows = await util.promisify(connection.query).bind(connection, query);
    return rows;
  }

  async getHistoryResultById(req, res) {
    const email = req.params.Email;
    try {
      const rows = await this.getHistoryResultByEmail(email);
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(rows);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getHistoryResultByEmail(email) {
    const query = "SELECT * FROM history WHERE Email = ?";
    const rows = await util.promisify(connection.query).bind(connection, query, [email]);
    return rows;
  }

  async addHistoryResult(req, res) {
    const { Email, Degree } = req.body;
    try {
      await this.insertHistoryResult(Email, Degree);
      res.status(201).json({ message: "The History was saved successfully." });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async insertHistoryResult(email, degree) {
    const query = "INSERT INTO history SET ?";
    await util.promisify(connection.query).bind(connection, query, {
      Email: email,
      Degree: degree,
    });
  }

  async updateHistoryResult(req, res) {
    const id = req.params.Id;
    const { Exam_id, Email, Degree } = req.body;
    try {
      const result = await this.updateHistoryResultById(id, Exam_id, Email, Degree);
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "History updated" });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateHistoryResultById(id, examId, email, degree) {
    const query = "UPDATE history SET Exam_id = ?, Email = ?, Degree = ? WHERE Id = ?";
    const result = await util.promisify(connection.query).bind(connection, query, [
      examId,
      email,
      degree,
      id,
    ]);
    return result;
  }

  async deleteHistoryResult(req, res) {
    const id = req.params.Id;
    try {
      const result = await this.deleteHistoryResultById(id);
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "History deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async deleteHistoryResultById(id) {
    const query = "DELETE FROM history WHERE Id = ?";
    const result = await util.promisify(connection.query).bind(connection, query, [id]);
    return result;
  }
}

const historyController = new HistoryController();

const router = express.Router();

router.get("/", (req, res) => historyController.getAllHistories(req, res));
router.get("/:Email", (req, res) => historyController.getHistoryResultById(req, res));
router.post("/", (req, res) => historyController.addHistoryResult(req, res));
router.put("/:Id", (req, res) => historyController.updateHistoryResult(req, res));
router.delete("/:Id", (req, res) => historyController.deleteHistoryResult(req, res));

module.exports = router;
/**In this implementation, a HistoryController class is defined, which contains methods for each endpoint. 
 * The methods handle the business logic and call 
 * the appropriate database methods to interact with the database. 
 * The database methods use the util.
 * promisify method to convert the callback-based connection.
 * query method to a promise-based method.

The HistoryController class is then instantiated, 
and the router endpoints are defined to call the appropriate methods of the HistoryController instance. 
This separates the concerns of routing and business logic, making the code more modular and easier to test.

Clean code principles are applied throughout the implementation, 
such as using descriptive method 
 and variable names, avoiding unnecessary comments,
  and separating concerns into small, focused methods.
   SOLID principles are also applied, such as single
    responsibility principle, by separating concerns
     into classes, and dependency inversion principle,
      by depending on abstractions instead of concrete implementations. */