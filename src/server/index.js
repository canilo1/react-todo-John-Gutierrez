import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/TodoRoutes.js";
import errorControl from "./middleware/errorControl.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

db();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorControl);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});