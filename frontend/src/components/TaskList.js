import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, startEdit, deleteTask }) {
  return (
    <ul className="list-group">
      {tasks.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          startEdit={startEdit}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
