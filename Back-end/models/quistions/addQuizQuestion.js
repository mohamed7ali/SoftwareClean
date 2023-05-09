const ExamQuestion = require("../../controller/quizController");

async function addQuizQuestion(req, res) {
  try {
    const examQuestion = new ExamQuestion();
    await examQuestion.add(req.body);
    res
      .status(201)
      .json({ message: "The question was added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = addQuizQuestion;