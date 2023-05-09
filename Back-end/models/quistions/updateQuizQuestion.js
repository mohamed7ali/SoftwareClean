const ExamQuestion = require("../../controller/quizController");

async function updateQuizQuestion(req, res) {
  try {
    const examQuestion = new ExamQuestion();
    await examQuestion.update(req.params.Id, req.body);
    res.status(202).json({ message: "Question updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = updateQuizQuestion;