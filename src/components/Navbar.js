import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ token }) => {
  const [display, setDisplay] = useState(false);

  const handleClick = () => {
    console.log("hamburger clicked");
    setDisplay(!display);
  };

  return (
    <div className="navbar">
      <h2>STRANGER'S THINGS</h2>
      <div className="links">
        <Link to="/">HOME</Link>
        <Link to="/posts">POSTS</Link>
        {!token && <Link to="/login">LOGIN</Link>}
        {token && <Link to="/user">PROFILE</Link>}
        {token && <Link to="/logout">LOGOUT</Link>}
      </div>
      <div className="small-nav">
        <span
          className="hamburger material-symbols-outlined"
          onClick={handleClick}
        >
          menu
        </span>
        <div className={display ? "hamburger-links" : "hamburger-links hide"}>
          <Link to="/">HOME</Link>
          <Link to="/posts">POSTS</Link>
          {!token && <Link to="/login">LOGIN</Link>}
          {token && <Link to="/user">PROFILE</Link>}
          {token && <Link to="/logout">LOGOUT</Link>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
