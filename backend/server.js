const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET not defined in environment!");
  process.exit(1);
}

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/tasksRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// DB Connection & Server Start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(` Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1); // Stop app if DB fails
  });
