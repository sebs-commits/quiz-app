const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
});

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
