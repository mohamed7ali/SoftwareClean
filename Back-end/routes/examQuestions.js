const express = require("express");

const { connection, query } = require("../db/connection");
class QuizController {
  async getQuizQuestions(req, res) {
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
  }

  async addQuizQuestion(req, res) {
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
  }

  async getAllQuizQuestions(req, res) {
    try {
      // Fetch all quiz questions with answers from the database
      const rows = await query("SELECT * FROM exam_question");

      // Send the quiz data as JSON
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch quiz data" });
    }
  }

  async getQuizQuestionById(req, res) {
    try {
      const Id = req.params.Id;
      const rows = await query(
        "SELECT * FROM exam_question WHERE ?",
        { Id: Id }
      );
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async updateQuizQuestion(req, res) {
    const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = req.body;
    try {
      const result = await query(
        "UPDATE exam_question SET Audio = ?, Question = ?, Ans_1 = ?, Ans_2 = ?, Ans_3 = ?, Ans_4 = ?, Correct = ? WHERE Id = ?",
        [
          Audio,
          Question,
          Ans_1,
          Ans_2,
          Ans_3,
          Ans_4,
          Correct,
          req.params.Id,
        ]
      );
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "Question updated" });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  async deleteQuizQuestion(req, res) {
    try {
      const id = req.params.Id;
      const result = await query("DELETE FROM exam_question WHERE Id = ?", [
        id,
      ]);
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res
          .status(202)
          .json({ message: "question deleted successfully" });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}

const quizController = new QuizController();
const router = express.Router();

router.get("/", quizController.getQuizQuestions.bind(quizController));
router.post("/", quizController.addQuizQuestion.bind(quizController));
router.get("/all", quizController.getAllQuizQuestions.bind(quizController));
router.get("/:Id", quizController.getQuizQuestionById.bind(quizController));
router.put("/:Id", quizController.updateQuizQuestion.bind(quizController));
router.delete("/:Id", quizController.deleteQuizQuestion.bind(quizController));

module.exports = router;