import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizById } from "../api/quizApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "../components/Loading";
import "../styles/Quiz.css";

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  // handle selecting an option for a question
  const handleOptionSelect = (questionIndex, optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex,
    });
  };

  // handle submit button
  const handleSubmit = () => {
    let newScore = 0;
    quiz.questions.forEach((question, index) => {
      if (
        question.options[userAnswers[index]] &&
        question.options[userAnswers[index]].isCorrect
      ) {
        newScore += 1;
      }
      setScore(newScore);
    });
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Quiz not found.</p>;
  return (
    <div className="main-container">
      <div className="title-container">
        <h3>{quiz.title}</h3>
      </div>

      {quiz.questions && quiz.questions.length > 0 ? (
        <form
          className="form-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            handleClickOpen();
          }}
        >
          <ul>
            {quiz.questions.map((question, questionIndex) => (
              <div className="question-container">
                <li key={questionIndex}>
                  <h3>
                    Question {questionIndex + 1}: {question.questionText}
                  </h3>
                  <hr className="divider" />
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <div className="selection">
                        <li
                          key={optionIndex}
                          onClick={() =>
                            handleOptionSelect(questionIndex, optionIndex)
                          }
                          style={{
                            cursor: "pointer",
                            color:
                              userAnswers[questionIndex] === optionIndex
                                ? "green"
                                : "black",
                          }}
                        >
                          <h4>{option.text}</h4>
                        </li>
                      </div>
                    ))}
                  </ul>
                </li>
              </div>
            ))}
          </ul>
          <button type="submit" className="submit-btn">
            <h3>Submit</h3>
          </button>
        </form>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
      {score !== null && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Score"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your score: {score}/{quiz.questions.length}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Close Alert</button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Quiz;
