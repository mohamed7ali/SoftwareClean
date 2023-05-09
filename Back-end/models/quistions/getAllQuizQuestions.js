const ExamQuestion = require("../../controller/quizController");
class ExtendedExamQuestion extends ExamQuestion {
  constructor() {
    super("exam_question");
  }
}
async function getAllQuizQuestions(req, res) {
  try {
    const examQuestion = new ExtendedExamQuestion();
    
    const rows = await examQuestion.getAll();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllQuizQuestions;