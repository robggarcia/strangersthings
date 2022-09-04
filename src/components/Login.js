import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import { BASE_URL } from "../App";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const info = await response.json();
    if (!info.success) {
      setError(info.error.message);
    } else {
      setError("");
      // save the token in our react state
      setToken(info.data.token);
      // save the token in local storage
      localStorage.setItem("token", info.data.token);
      navigate("/user");
    }
  };

  const handleUserInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePassInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username *"
          value={username}
          onChange={handleUserInput}
          required
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={handlePassInput}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">Don't have an account? Sign Up</Link>
      <p>{error}</p>
    </div>
  );
};

export default Login;
