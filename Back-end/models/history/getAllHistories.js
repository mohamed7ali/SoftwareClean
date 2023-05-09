const connection = require("../../db/connection");

function getAllHistories(req, res) {
  try {
    connection.query("SELECT * FROM history", (error, rows, fields) => {
      res.json(rows);
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = getAllHistories;