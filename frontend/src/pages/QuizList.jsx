import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizzes } from "../api/quizApi";
import Loading from "../components/Loading";

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
      {error && <p>Error fetching quizzes: {error}</p>}

      {!isLoading && !error && (
        <ul>
          <h1>Quizzes</h1>
          {quizzes.map((quiz) => (
            <li key={quiz._id}>
              <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizzesList;
