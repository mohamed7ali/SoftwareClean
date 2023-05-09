const connection = require("../../db/connection");

function deleteHistoryById(req, res) {
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
}

module.exports = deleteHistoryById;