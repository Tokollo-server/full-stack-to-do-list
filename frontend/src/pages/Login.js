import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ loginEmail, setLoginEmail, loginPassword, setLoginPassword }) {
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        navigate("/tasks");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
