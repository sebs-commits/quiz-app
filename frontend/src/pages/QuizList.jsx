import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizzes } from "../api/quizApi";
import Loading from "../components/Loading";
import "../styles/QuizList.css";
const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [description, setDescription] = useState([]);
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
        <ul>
          <h1>Quizzes</h1>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <Link to={`/quizzes/${quiz._id}`}>
                {quiz.title} {quiz.description}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizzesList;
