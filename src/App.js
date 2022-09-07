import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchPosts, fetchUser } from "./api";
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
    const data = await fetchPosts(token);
    console.log(data.data.posts);
    setPosts(data.data.posts);
  };

  const getUser = async () => {
    // check local storage to see if a token is avalable
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));

    if (!token) return;

    const info = await fetchUser(token);
    console.log("THE USER INFO: ", info);
    if (info.success) {
      setUser(info.data);
      // set messages sent by user
      setSent(info.data.messages);
    }
  };

  useEffect(() => {
    getPosts();
    getUser();
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
          path="posts/:postId/*"
          element={
            <SinglePost
              token={token}
              user={user}
              posts={posts}
              setPosts={setPosts}
              setUser={setUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
