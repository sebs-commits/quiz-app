import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/create" element={<CreateQuiz isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;