const connection = require("../db/connection");

class ExamQuestion {
  constructor(table) {
    this.table = table;
  }

  async getAll() {
    try {
      const rows = await connection.query(`SELECT * FROM ${this.table}`);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch exam questions");
    }
  }

  async getById(id) {
    try {
      const rows = await connection.query(
        `SELECT * FROM ${this.table} WHERE Id = ?`,
        [id]
      );
      if (rows.length === 0) {
        throw new Error("Exam question not found");
      }
      return rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch exam question");
    }
  }

  async add(data) {
    const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = data;
    try {
      await connection.query(`INSERT INTO ${this.table} SET ?`, {
        Audio,
        Question,
        Ans_1,
        Ans_2,
        Ans_3,
        Ans_4,
        Correct,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add exam question");
    }
  }

  async update(id, data) {
    const { Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct } = data;
    try {
      const result = await connection.query(
        `UPDATE ${this.table} SET Audio = ?, Question = ?, Ans_1 = ?, Ans_2 = ?, Ans_3 = ?, Ans_4 = ?, Correct = ? WHERE Id = ?`,
        [Audio, Question, Ans_1, Ans_2, Ans_3, Ans_4, Correct, id]
      );
      if (result.affectedRows === 0) {
        throw new Error("Exam question not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update exam question");
    }
  }

  async delete(id) {
    try {
      const result = await connection.query(
        `DELETE FROM ${this.table} WHERE Id = ?`,
        [id]
      );
      if (result.affectedRows === 0) {
        throw new Error("Exam question not found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete exam question");
    }
  }
}

module.exports = ExamQuestion;