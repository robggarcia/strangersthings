import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ token, user }) => {
  return (
    <div className="home">
      <h1>Welcome to Stranger's Things</h1>
      {token ? (
        <>
          <h2>You are logged in as {user.username}</h2>
          <Link to="/user">
            <button>VIEW PROFILE</button>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default Home;
