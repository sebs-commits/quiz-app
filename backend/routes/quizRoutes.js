const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

// Route to create a new quiz
router.post("/", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(200).send("Quiz Created Successfully");
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to get a single quiz by ID
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send("Quiz not found.");
    }
    res.status(200).send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to delete a quiz
router.delete("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).send("Quiz not found.");
    res.status(200).send("Quiz deleted successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to delete a specific quiz question
router.delete("/:quizId/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).send("Quiz not found.");

    quiz.questions = quiz.questions.filter(
      (question) => question._id.toString() !== req.params.questionId
    );
    await quiz.save();

    res.status(200).send("Question deleted successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to edit
router.patch("/:quizId/questions/:questionId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).send("Quiz not found.");

    const question = quiz.questions.id(req.params.questionId);
    if (!question) return res.status(404).send("Question not found.");

    if (req.body.questionText) question.questionText = req.body.questionText;
    if (req.body.options) question.options = req.body.options;

    await quiz.save();
    res.status(200).send("Question updated successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
