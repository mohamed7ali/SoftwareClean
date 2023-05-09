const ExamQuestion = require("../../controller/quizController");
class ExtendedExamQuestion extends ExamQuestion {
  constructor() {
    super("exam_question");
  }
}
async function updateQuizQuestion(req, res) {
  try {
    const examQuestion = new ExtendedExamQuestion();
    await examQuestion.update(req.params.Id, req.body);
    res.status(202).json({ message: "Question updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = updateQuizQuestion;