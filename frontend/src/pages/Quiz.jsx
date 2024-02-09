import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../api/quizApi";

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getQuizById(id)
      .then(setQuiz)
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch quiz details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Quiz not found.</p>;
  return (
    <div>
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      {quiz.questions && quiz.questions.length > 0 ? (
        <ul>
          {quiz.questions.map((question, index) => (
            <li key={index}>
              <h4>
                Question {index + 1}: {question.questionText}
              </h4>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    {option.text} {option.isCorrect ? "(Correct)" : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
  );
}

export default Quiz;
