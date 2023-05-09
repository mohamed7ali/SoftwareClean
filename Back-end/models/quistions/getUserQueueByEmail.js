const { query } = require("../../db/connection");
const examQuestion = new ExamQuestion();
async function getUserQueueByEmail(email) {
  try {
    const rows = await query(
      "SELECT * FROM quiz_queue WHERE Email = ?",
      [email]
    );
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user queue");
  }
}

module.exports = getUserQueueByEmail;