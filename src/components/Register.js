import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

import "./Register.css";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checkPass, setCheckPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/users/register`, {
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
      console.log(info);
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

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username *"
          value={username}
          onChange={handleUserInput}
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={handlePassInput}
        />
        <input
          type="password"
          placeholder="Confirm Password *"
          value={confirm}
          onChange={handleConfirm}
          onBlur={() =>
            password === confirm ? setCheckPass(true) : setCheckPass(false)
          }
        />
        {!checkPass && <p>Passwords must match</p>}
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Log In</Link>
      <p>{error}</p>
    </div>
  );
};

export default Register;
