const connection = require("../../db/connection");

function updateHistoryById(req, res) {
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
}

module.exports = updateHistoryById;