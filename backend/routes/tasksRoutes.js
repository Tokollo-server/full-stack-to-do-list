const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const gmailCheck = require("../middleware/gmailCheck");
const jsonOnly = require("../middleware/jsonOnly");
const limitTaskLength = require("../middleware/limitTaskLength");

const router = express.Router();

// Apply authentication and gmail check to all task routes
router.use(auth, gmailCheck);

// Get all tasks (READ)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add task (CREATE)
router.post("/", jsonOnly, limitTaskLength, async (req, res) => {
  try {
    console.log("req.user in POST /api/tasks:", req.user);

    const task = await Task.create({
      userId: req.user.id,
      text: req.body.text,
    });

    res.json(task);
  } catch (err) {
    console.error("Error in POST /api/tasks:", err.message);
    res.status(500).json({ message: "Server error", error: err.message }); // Return error for easier debugging
  }
});

// Update task (UPDATE)
router.put("/:id", jsonOnly, limitTaskLength, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { text: req.body.text },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete task (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
