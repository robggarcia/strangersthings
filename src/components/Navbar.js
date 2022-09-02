import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ user }) => {
  return (
    <div className="navbar">
      <Link to="/">HOME</Link>
      <Link to="/posts">POSTS</Link>
      <Link to="/login">LOGIN</Link>
      {user && <Link to="/user">PROFILE</Link>}
      {user && <Link to="">LOGOUT</Link>}
    </div>
  );
};

export default Navbar;
