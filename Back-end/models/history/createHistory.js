const connection = require("../../db/connection");

async function createHistory(req, res) {
  const { Email, Degree } = req.body;
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
}

module.exports = createHistory;