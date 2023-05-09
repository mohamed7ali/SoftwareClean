const ExamQuestion = require("../../controller/quizController");
class ExtendedExamQuestion extends ExamQuestion {
  constructor() {
    super("exam_question");
  }
}
async function addQuizQuestion(req, res) {
  try {
    const examQuestion = new ExtendedExamQuestion();
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
