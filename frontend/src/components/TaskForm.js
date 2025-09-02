import React from "react";

function TaskForm({
  task,
  setTask,
  handleTaskSubmit,
  editTaskId,
  taskInputRef,
}) {
  return (
    <form onSubmit={handleTaskSubmit} className="mb-3">
      <label>Task</label>
      <input
        type="text"
        className="form-control mb-2"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        ref={taskInputRef}
      />
      <button type="submit" className="btn btn-primary w-100">
        {editTaskId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
