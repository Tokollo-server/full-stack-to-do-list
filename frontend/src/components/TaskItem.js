import React from "react";

function TaskItem({ task, startEdit, deleteTask }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {task.text}
      <div>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => startEdit(task)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
