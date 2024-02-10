import React, { useState } from "react";
import { createQuiz } from "../api/quizApi";

export default function CreateQuiz() {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const handleTitleChange = (e) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setQuiz({ ...quiz, description: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index].questionText = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleOptionChange = (e, qIndex, oIndex) => {
    const newQuestions = [...quiz.questions];
    const options = [...newQuestions[qIndex].options];
    options[oIndex] = { ...options[oIndex], text: e.target.value };
    newQuestions[qIndex].options = options;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...quiz.questions];
    const options = newQuestions[qIndex].options.map((option, index) => {
      return { ...option, isCorrect: index === oIndex };
    });
    newQuestions[qIndex].options = options;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          questionText: "",
          options: Array(4).fill({ text: "", isCorrect: false }),
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createQuiz(quiz);
      console.log("Quiz Created:", response);
      // create some sort of user feedback here
    } catch (error) {
      console.error("Failed to create quiz:", error);
      // gotta create proper error handlers
    }
  };
  return (
    <div>
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="quiz-title">Quiz Title</label>
        <input
          id="quiz-title"
          type="text"
          value={quiz.title}
          onChange={handleTitleChange}
          required
        />

        <label htmlFor="quiz-description">Description</label>
        <input
          id="quiz-description"
          type="text"
          value={quiz.description}
          onChange={handleDescriptionChange}
          required
        />

        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex}>
            <label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</label>
            <input
              id={`question-${qIndex}`}
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(e, qIndex)}
              required
            />

            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                  required
                />
                <label>
                  <input
                    type="radio"
                    name={`correct-option-${qIndex}`}
                    checked={option.isCorrect}
                    onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                  />
                  {/* {oIndex === question.options.length - 1 ? "Correct" : "Wrong"} */}
                </label>
              </div>
            ))}
          </div>
        ))}

        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}
