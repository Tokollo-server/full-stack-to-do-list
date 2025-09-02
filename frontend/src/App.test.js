import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const api = "http://localhost:4000";

  // Register
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/auth/register`, { username, password });
      alert("Registered successfully! You can now log in.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Login
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/auth/login`, { username, password });
      setToken(res.data.token);
      setIsLoggedIn(true);
      localStorage.setItem("token", res.data.token);
      fetchTasks(res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // Fetch tasks
  const fetchTasks = async (authToken = token) => {
    try {
      const res = await axios.get(`${api}/tasks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add or Update task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTaskId) {
        // Update existing task
        await axios.put(
          `${api}/tasks/${editTaskId}`,
          { title: task },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditTaskId(null);
      } else {
        // Add new task
        await axios.post(
          `${api}/tasks`,
          { title: task },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTask("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${api}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing a task
  const startEdit = (task) => {
    setTask(task.title);
    setEditTaskId(task._id);
  };

  // Check localStorage on load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchTasks(savedToken);
    }
  }, []);

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <>
          {/* Register */}
          <h2>Register</h2>
          <form onSubmit={registerUser} className="mb-4">
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          {/* Login */}
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Your Tasks</h2>
          <form onSubmit={handleTaskSubmit} className="mb-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="New Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
          </form>
          <ul className="list-group">
            {tasks.map((t) => (
              <li
                key={t._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {t.title}
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTask(t._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
