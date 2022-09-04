import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchPosts } from "./api";
import "./App.css";
import {
  Home,
  Login,
  Navbar,
  Posts,
  Register,
  Profile,
  Logout,
  NewPost,
  SinglePost,
} from "./components";

export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-VPI-RM-WEB-PT";

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [singlePost, setSinglePost] = useState({});
  const [sent, setSent] = useState({});

  const getPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.data.posts);
      setPosts(data.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    // check local storage to see if a token is avalable
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));

    if (!token) return;

    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    console.log("THE USER INFO: ", info);
    if (info.success) {
      setUser(info.data);
      // set messages sent by user
      setSent(info.data.messages);
    }
  };

  useEffect(() => {
    getPosts();
    fetchUser();
  }, [token]);

  return (
    <div className="App">
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="posts"
          element={
            <Posts posts={posts} token={token} setSinglePost={setSinglePost} />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/user"
          element={
            <Profile
              posts={posts}
              user={user}
              sent={sent}
              setSinglePost={setSinglePost}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout setToken={setToken} setUser={setUser} />}
        />
        <Route
          path="posts/new"
          element={<NewPost token={token} posts={posts} setPosts={setPosts} />}
        />
        <Route
          path="posts/:id"
          element={
            <SinglePost
              token={token}
              singlePost={singlePost}
              user={user}
              posts={posts}
              setPosts={setPosts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
