const express = require("express");
const {connection }= require("../db/connection");
const util = require("util");

class QuizController {
  async getQuizQuestions(req, res) {
    try {
      const rows = await this.getRandomQuizQuestions(5);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch quiz data" });
    }
  }

  async getRandomQuizQuestions(limit) {
    const query = "SELECT * FROM exam_question ORDER BY RAND() LIMIT ?";
    const rows = await util.promisify(connection.query).bind(connection, query, [limit]);
    return rows;
  }

  async getAllQuizQuestions(req, res) {
    try {
      const rows = await this.getAllQuestions();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch quiz data" });
    }
  }

  async getAllQuestions() {
    const query = "SELECT * FROM exam_question";
    const rows = await util.promisify(connection.query).bind(connection, query);
    return rows;
  }

  async getQuizQuestionById(req, res) {
    try {
      const id = req.params.Id;
      const rows = await this.getQuestionById(id);
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getQuestionById(id) {
    const query = "SELECT * FROM exam_question WHERE ?";
    const rows = await util.promisify(connection.query).bind(connection, query, [{ Id: id }]);
    return rows;
  }

  async addQuizQuestion(req, res) {
    const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = req.body;
    try {
      await this.insertQuestion(Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct);
      res.status(201).json({ message: "The question was added successfully." });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async insertQuestion(audio, question, ans1, ans2, ans3, ans4, correct) {
    const query = "INSERT INTO exam_question SET ?";
    await util.promisify(connection.query).bind(connection, query, {
      Audio: audio,
      Question: question,
      Ans_1: ans1,
      Ans_2: ans2,
      Ans_3: ans3,
      Ans_4: ans4,
      Correct: correct,
    });
  }

  async updateQuizQuestion(req, res) {
    const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = req.body;
    try {
      const id = req.params.Id;
      const result = await this.updateQuestionById(id, Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct);
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "Question updated" });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateQuestionById(id, audio, question, ans1, ans2, ans3, ans4, correct) {
    const query =
      "UPDATE exam_question SET Audio = ?, Question = ?, Ans_1 = ?, Ans_2 = ?, Ans_3 = ?, Ans_4 = ?, Correct = ? WHERE Id = ?";
    const result = await util.promisify(connection.query).bind(connection, query, [
      audio,
      question,
      ans1,
      ans2,
      ans3,
      ans4,
      correct,
      id,
    ]);
    return result;
  }

  async deleteQuizQuestion(req, res) {
    try {
      const id = req.params.Id;
      const result = await this.deleteQuestionById(id);
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).json({ message: "Question deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async deleteQuestionById(id) {
    const query = "DELETE FROM exam_question WHERE Id = ?";
    const result = await util.promisify(connection.query).bind(connection, query, [id]);
    return result;
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
/**I created a QuizController class that contains the CRUD operations for
 *  quiz questions. I extracted the database operations
 *  to separate methods and used async/await instead
 *  of callbacks to handle asynchronous operations.
 *  I also added descriptive method names and parameter 
 * names to improve readability.

I used bind() to bind the quizController instance to
 the route handlers, which makes the code more concise and readable. */