import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setToken, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
