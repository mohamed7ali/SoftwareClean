const express = require("express");
const getQuizQuestions = require("../models/quistions/getQuizQuestions");
const addQuizQuestion = require("../models/quistions/addQuizQuestion");
const getAllQuizQuestions = require("../models/quistions/getAllQuizQuestions");
const getQuizQuestionById = require("../models/quistions/getQuizQuestionById");
const updateQuizQuestion = require("../models/quistions/updateQuizQuestion");
const deleteQuizQuestion = require("../models/quistions/deleteQuizQuestion");

const router = express.Router();

router.get("/", getQuizQuestions);
router.post("/", addQuizQuestion);
router.get("/all", getAllQuizQuestions);
router.get("/:Id", getQuizQuestionById);
router.put("/:Id", updateQuizQuestion);
router.delete("/:Id", deleteQuizQuestion);

module.exports = router;