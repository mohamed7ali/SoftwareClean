const ExamQuestion = require("../../controller/quizController");

async function deleteQuizQuestion(req, res) {
  try {
    const examQuestion = new ExamQuestion();
    await examQuestion.delete(req.params.Id);
    res.status(202).json({ message: "Question deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteQuizQuestion;