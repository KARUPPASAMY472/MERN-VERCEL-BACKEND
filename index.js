import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // change after deploy
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ Mongoose Schema
const todoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// ✅ CRUD Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ task: req.body.task });
  await newTodo.save();
  res.json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.get("/", (req, res) => res.send("Todo backend is running!"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
