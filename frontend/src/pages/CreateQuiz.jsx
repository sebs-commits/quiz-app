import React, { useState } from "react";
import { createQuiz } from "../api/quizApi";
import "../styles/Create.css";

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
    <div className="main-container">
      <div className="sub-container">
        <h2 className="page-title">Create a Quiz</h2>
        <button type="submit" className="create-btn">
          Create
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        {/* <label htmlFor="quiz-title">Quiz Title</label> */}
        <input
          className="title-input"
          id="quiz-title"
          type="text"
          value={quiz.title}
          onChange={handleTitleChange}
          placeholder="Title"
          required
        />
        {/* <label htmlFor="quiz-description">Description</label> */}
        <input
          className="description-input"
          id="quiz-description"
          type="text"
          value={quiz.description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          required
        />
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-div">
            {/* <label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</label> */}
            <input
              className="question-number"
              id={`question-${qIndex}`}
              placeholder={`Question ${qIndex + 1}`}
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(e, qIndex)}
              required
            />
            <hr className="divider"></hr>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="inner-question-container">
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    name={`correct-option-${qIndex}`}
                    checked={option.isCorrect}
                    onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                  />
                  {/* {oIndex === question.options.length - 1 ? "Correct" : "Wrong"} */}
                </label>
                <input
                  className="option-input"
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(e, qIndex, oIndex)}
                  required
                />
              </div>
            ))}
          </div>
        ))}

        <div className="sub-container">
          <button type="button" onClick={addQuestion} className="create-btn">
            Add Question
          </button>
          <button type="submit" className="create-btn">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
