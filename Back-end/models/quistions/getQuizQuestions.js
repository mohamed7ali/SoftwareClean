const ExamQuestion = require("../../controller/quizController");
class ExtendedExamQuestion extends ExamQuestion {
  constructor() {
    super("exam_question");
  }
}
async function getQuizQuestions(req, res) {
  try {
    const examQuestion = new ExtendedExamQuestion();
    const rows = await examQuestion.getAll();
    const quizData = rows.sort(() => 0.5 - Math.random()).slice(0, 5);
    res.json(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getQuizQuestions;
