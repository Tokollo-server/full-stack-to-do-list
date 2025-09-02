import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Tasks";

function App() {
  // State hooks for Register form
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // State hooks for Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register user function (just an example)
  const registerUser = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior
    console.log("User Registered", { registerEmail, registerPassword });
    // Replace with API call logic
  };

  // Login user function (example)
  const loginUser = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior
    console.log("User Logged In", { loginEmail, loginPassword });
    // Replace with API call logic
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />{" "}
        {/* Redirect to Register by default */}
        <Route
          path="/login"
          element={
            <LoginPage
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
              loginUser={loginUser} // Pass loginUser function
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              registerEmail={registerEmail}
              setRegisterEmail={setRegisterEmail}
              registerPassword={registerPassword}
              setRegisterPassword={setRegisterPassword}
              registerUser={registerUser} // Pass registerUser function
            />
          }
        />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
