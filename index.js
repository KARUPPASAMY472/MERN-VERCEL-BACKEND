import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://mern-vercel-todo-front-end-123.vercel.app", // ✅ current deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Optional fallback header (handles preflight)
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://mern-vercel-todo-front-end-123.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => res.send("Backend working fine!"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
