const ExamQuestion = require("../../controller/quizController");
class ExtendedExamQuestion extends ExamQuestion {
  constructor() {
    super("exam_question");
  }
}
async function deleteQuizQuestion(req, res) {
  try {
    const examQuestion = new ExtendedExamQuestion();
    await examQuestion.delete(req.params.Id);
    res.status(202).json({ message: "Question deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteQuizQuestion;