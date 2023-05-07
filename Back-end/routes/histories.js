const router = require("express").Router();
const connection = require("../db/connection");
class HistoryController {
  constructor(connection) {
    this.connection = connection;
  }

  getAllHistories = (req, res) => {
    try {
      this.connection.query("SELECT * FROM history", (error, rows, fields) => {
        res.json(rows);
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  getHistoryById = (req, res) => {
    const id = req.params.Email;
    try {
      this.connection.query(
        "SELECT * FROM history WHERE Email = ?",
        [id],
        (error, rows, fields) => {
          if (rows.length === 0) {
            res.sendStatus(404);
          } else {
            res.json(rows);
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  createHistory = async (req, res) => {
    const { Email, Degree } = req.body;
    try {
      this.connection.query(
        "INSERT INTO history set ?",
        {
          Email: Email,
          Degree: Degree,
        },
        (error, rows, fields) => {
          res
            .status(201)
            .json({ message: "The History was saved successfully." });
        }
      );
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  updateHistoryById = (req, res) => {
    const id = req.params.Id;
    const { Exam_id, Email, Degree } = req.body;
    try {
      this.connection.query(
        "UPDATE history SET Exam_id = ?, Email = ?, Degree = ? WHERE Id = ?",
        [Exam_id, Email, Degree, id],
        (error, rows, fields) => {
          if (rows.affectedRows === 0) {
            res.sendStatus(404);
          } else {
            res.status(202).json({ message: "history Updated" });
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  deleteHistoryById = (req, res) => {
    const Id = req.params.Id;
    try {
      this.connection.query(
        "DELETE FROM history WHERE Id = ?",
        [Id],
        (error, rows, fields) => {
          if (rows.affectedRows === 0) {
            res.sendStatus(404);
          } else {
            res.status(202).json({ message: "History deleted successfully" });
          }
        }
      );
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };
}

const historyController = new HistoryController(connection);
router.get("/", historyController.getAllHistories);
router.get("/:Email", historyController.getHistoryById);
router.post("/", historyController.createHistory);
router.put("/:Id", historyController.updateHistoryById);
router.delete("/:Id", historyController.deleteHistoryById);

module.exports = router;