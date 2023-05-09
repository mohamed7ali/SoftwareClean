const ExamQuestion = require("../../routes/examQuestions");

async function getQuizQuestions(req, res) {
  try {
    const examQuestion = new ExamQuestion();
    const rows = await examQuestion.getAll();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = getQuizQuestions;