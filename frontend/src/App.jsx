import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import QuizList from "./pages/QuizList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
