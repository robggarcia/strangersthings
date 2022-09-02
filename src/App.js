import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchPosts } from "./api";
import "./App.css";
import { Home, Login, Navbar, Posts, Register, Profile } from "./components";

export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-VPI-RM-WEB-PT";

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const handleFetchPosts = async () => {
    const data = await fetchPosts();
    setPosts(data);
  };

  const fetchUser = async () => {
    const localStorageToken = localStorage.getItem("token");
    if (!token) setToken(localStorageToken);

    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
    const info = await response.json();
    console.log("THE USER INFO: ", info);
    if (info.success) setUser(info.data);
  };

  useEffect(() => {
    handleFetchPosts();
    fetchUser();
  }, [token]);

  return (
    <div className="App">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts posts={posts} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/user" element={<Profile user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
