import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ token }) => {
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
    </div>
  );
};

export default Navbar;
