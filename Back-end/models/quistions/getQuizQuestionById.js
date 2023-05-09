const ExamQuestion = require("../../controller/quizController");

async function getQuizQuestions(req, res,id) {
  try {
    const id = req.params.Id;
    const examQuestion = new ExamQuestion();
    const rows = await examQuestion.getById(id);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getQuizQuestions;
