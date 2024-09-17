require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const app = express();

const PORT = process.env.PORT;

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://quiz-wwaj6wknk-sebastians-projects-b3cb570a.vercel.app/",
  "https://quiz-app-ezsn.onrender.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
//test
app.get("/", (req, res) => {
  res.json("Successfully uploaded backend");
});

app.use("/api/quizzes", quizRoutes);
mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
