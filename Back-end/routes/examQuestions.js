const router = require("express").Router();
const connection = require("../db/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

// Route to fetch 5 quizies from data
router.get("/", async (req, res) => {
  try {
    // Fetch five random quiz questions with answers from the database
    const rows = await query(
      "SELECT * FROM exam_question ORDER BY RAND() LIMIT 5"
    );

    // Send the quiz data as JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
});

// Insert a new question
router.post("/", async (req, res) => {
  const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = req.body;
  console.log(Audio);
  try {
    await query(
      "INSERT INTO exam_question set ?",
      {
        Audio: Audio,
        Question: Question,
        Ans_1: Ans_1,
        Ans_2: Ans_2,
        Ans_3: Ans_3,
        Ans_4: Ans_4,
        Correct: Correct,
      },
      (err, result, fields) => {
        res
          .status(201)
          .json({ message: "The question was added successfully." });
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route to fetch all quizies from data
router.get("/all", async (req, res) => {
  try {
    // Fetch five random quiz questions with answers from the database
    const rows = await query("SELECT * FROM exam_question");

    // Send the quiz data as JSON
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quiz data" });
  }
});
// Retrieve a single quiz by ID
router.get("/:Id", (req, res) => {
  try {
    const Id = req.params.Id;
    connection.query(
      "SELECT * FROM exam_question WHERE ?",
      { Id: Id },
      (error, rows, fields) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else if (rows.length === 0) {
          res.sendStatus(404);
        } else {
          res.json(rows[0]);
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



// Update a question by ID
router.put("/:Id", (req, res) => {
  const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = req.body;
  try {
    connection.query(
      "UPDATE exam_question SET Audio = ?, Question = ?, Ans_1 = ?, Ans_2 = ?, Ans_3 = ?, Ans_4 = ?, Correct = ? WHERE Id = ?",
      [Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct, req.params.Id],
      (err, result, fields) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(202).json({ message: "Question updated" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete a question by ID
router.delete("/:Id", (req, res) => {
  try {
    const id = req.params.Id;
    connection.query(
      "DELETE FROM exam_question WHERE Id = ?",
      [id],
      (err, result, fields) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.status(202).json({ message: "question deleted successfully" });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;