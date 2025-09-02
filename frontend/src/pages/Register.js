import React from "react";

function Register({
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
}) {
  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Registering with:", registerEmail, registerPassword);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User registered successfully!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
