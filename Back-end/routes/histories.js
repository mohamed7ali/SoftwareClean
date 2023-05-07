const router = require("express").Router();
const connection = require("../db/connection");

class HistoryController {
  constructor(connection) {
    this.connection = connection;
  }

  async getAllHistories(req, res) {
    try {
      const rows = await this.connection.query("SELECT * FROM history");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async getHistoryById(req, res) {
    const email = req.params.Email;
    try {
      const rows = await this.connection.query(
        "SELECT * FROM history WHERE Email = ?",
        [email]
      );
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(rows);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async createHistory(req, res) {
    const { Email, Degree } = req.body;
    try {
      await this.connection.query("INSERT INTO history SET ?", {
        Email: Email,
        Degree: Degree,
      });
      res.status(201).json({ message: "The History was saved successfully." });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async updateHistoryById(req, res) {
    const id = req.params.Id;
    const { Exam_id, Email, Degree } = req.body;
    try {
      const result = await this.connection.query(
        "UPDATE history SET Exam_id = ?, Email = ?, Degree = ? WHERE Id = ?",
        [Exam_id, Email, Degree, id]
      );
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "history Updated" });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async deleteHistoryById(req, res) {
    const id = req.params.Id;
    try {
      const result = await this.connection.query(
        "DELETE FROM history WHERE Id = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json({ message: "History deleted successfully" });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

const historyController = new HistoryController(connection);
router.get("/", historyController.getAllHistories.bind(historyController));
router.get("/:Email", historyController.getHistoryById.bind(historyController));
router.post("/", historyController.createHistory.bind(historyController));
router.put("/:Id", historyController.updateHistoryById.bind(historyController));
router.delete("/:Id", historyController.deleteHistoryById.bind(historyController));

module.exports = router;