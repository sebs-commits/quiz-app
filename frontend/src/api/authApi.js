const apiUrl = "http://localhost:3000/api"; // Adjust this URL as needed

// Function to login a user
export const login = async (credentials) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Failed to login");
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Function to register a user
export const register = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to register");
    return await response.json();
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};