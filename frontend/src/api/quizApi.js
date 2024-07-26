const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
// "http://localhost:3000/api" ||
// replace above when in development
// Function to create a new quiz
export const createQuiz = async (quizData) => {
  try {
    const response = await fetch(`${apiUrl}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });
    if (!response.ok) throw new Error("Failed to create quiz");
    return await response.json();
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

// Function to get all quizzes
export const getQuizzes = async () => {
  try {
    const response = await fetch(`${apiUrl}/quizzes`);
    if (!response.ok) throw new Error("Failed to fetch quizzes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

// Function to delete a quiz
export const deleteQuiz = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/quizzes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete quiz");
    return "Quiz deleted successfully";
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
};

// Function to delete a specific quiz question
export const deleteQuizQuestion = async (quizId, questionId) => {
  try {
    const response = await fetch(
      `${apiUrl}/quizzes/${quizId}/questions/${questionId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete question");
    return "Question deleted successfully";
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

// Function to edit a quiz question
export const editQuizQuestion = async (quizId, questionId, questionData) => {
  try {
    const response = await fetch(
      `${apiUrl}/quizzes/${quizId}/questions/${questionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      }
    );
    if (!response.ok) throw new Error("Failed to update question");
    return "Question updated successfully";
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};
export const getQuizById = async (quizId) => {
  try {
    const response = await fetch(`${apiUrl}/quizzes/${quizId}`);
    if (!response.ok) throw new Error("Failed to fetch quiz");
    const quiz = await response.json();
    return quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};
