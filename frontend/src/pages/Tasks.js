import React, { useState, useEffect, useRef } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const taskInputRef = useRef(null);

  // Fetch tasks when component loads
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setTasks(data);
        } else {
          alert(data.message || "Failed to load tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Add or Update task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    if (editId) {
      // --- UPDATE task ---
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: task }),
        });

        const data = await res.json();
        if (res.ok) {
          setTasks(tasks.map((t) => (t._id === editId ? data : t)));
          setTask("");
          setEditId(null);
        } else {
          alert(data.message || "Update failed");
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // --- CREATE task ---
      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: task }),
        });

        const data = await res.json();
        if (res.ok) {
          setTasks([...tasks, data]); // add new task
          setTask("");
        } else {
          alert(data.message || "Task creation failed");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setTasks(tasks.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start editing
  const startEdit = (task) => {
    setTask(task.text);
    setEditId(task._id);
    taskInputRef.current.focus();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tasks</h2>
      <form className="d-flex mb-3" onSubmit={handleTaskSubmit}>
        <input
          type="text"
          ref={taskInputRef}
          className="form-control me-2"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul className="list-group">
        {tasks.map((t) => (
          <li
            key={t._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{t.text}</span>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => startEdit(t)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
