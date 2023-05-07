const router = require("express").Router();
const connection = require("../db/connection");

// Get all histories
router.get("/", (req, res) => {
  try {
    connection.query("SELECT * FROM history", (error, rows, fields) => {
      res.json(rows);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Get history result by ID
router.get("/:Email", (req, res) => {
  const id = req.params.Email;
  try {
    connection.query(
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
});

// Create a new history result
router.post("/", async (req, res) => {
  const {  Email, Degree, } = req.body;
  try {
    connection.query(
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
});

// Update an history result by ID
router.put("/:Id", (req, res) => {
  const id = req.params.Id;
  const { Exam_id, Email, Degree } = req.body;
  try {
    connection.query(
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
});

// Delete an history result by ID
router.delete("/:Id", (req, res) => {
  const Id = req.params.Id;
  try {
    connection.query(
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
});

module.exports = router;
