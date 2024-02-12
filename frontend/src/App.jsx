import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
