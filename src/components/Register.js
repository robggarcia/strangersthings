import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

import "./Register.css";

const Register = ({ setToken, getUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checkPass, setCheckPass] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const info = await registerUser(username, password);
    if (!info.success) {
      setError(info.error.message);
    } else {
      console.log(info);
      setError("");
      // save the token in our react state
      setToken(info.data.token);
      // save the token in local storage
      localStorage.setItem("token", info.data.token);
      getUser();
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
          required
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={handlePassInput}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password *"
          value={confirm}
          onChange={handleConfirm}
          onBlur={() =>
            password === confirm ? setCheckPass(true) : setCheckPass(false)
          }
          required
        />
        {!checkPass && <p>Passwords must match</p>}
        <button type="submit">REGISTER</button>
      </form>
      <Link to="/login">Already have an account? Log In</Link>
      <p>{error}</p>
    </div>
  );
};

export default Register;
