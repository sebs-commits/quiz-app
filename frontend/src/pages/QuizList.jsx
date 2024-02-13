import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizzes } from "../api/quizApi";
import Loading from "../components/Loading";
import "../styles/QuizList.css";
const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      {/* replace this with custom error component*/}
      {error && <p>Error fetching quizzes: {error}</p>}

      {!isLoading && !error && (
        <ul className="grid-container">
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <Link to={`/quizzes/${quiz._id}`} className="quiz-link">
                <div className="card-container">
                  <div className="text-container">
                    <h1>{quiz.title}</h1>
                    <p>{quiz.description}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizzesList;
