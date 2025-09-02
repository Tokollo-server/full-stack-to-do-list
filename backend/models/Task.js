const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true, maxlength: 140 },
});

module.exports = mongoose.model("Task", TaskSchema);
