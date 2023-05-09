const ExamQuestion = require("../../controller/quizController");

class ExtendedExamQuestion extends ExamQuestion {
  constructor() {
    super("exam_question");
  }
}

async function getQuizQuestions(req, res) {
  try {
    const id = req.params.Id;
    const examQuestion = new ExtendedExamQuestion();  // Use the extended class here
    const rows = await examQuestion.getById(id);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getQuizQuestions;
