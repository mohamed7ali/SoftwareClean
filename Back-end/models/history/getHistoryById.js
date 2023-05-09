const connection = require("../../db/connection");

function getHistoryById(req, res) {
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
}

module.exports = getHistoryById;