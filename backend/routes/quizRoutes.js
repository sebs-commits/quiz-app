const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
  deleteQuizQuestion,
  updateQuizQuestion,
} = require("../controllers/quizController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createQuiz); // Protected route
router.get("/", getAllQuizzes); // Public route
router.get("/:id", getQuizById); // Public route
router.delete("/:id", deleteQuiz);
router.delete("/:quizId/questions/:questionId", deleteQuizQuestion);
router.patch("/:quizId/questions/:questionId", updateQuizQuestion);

module.exports = router;