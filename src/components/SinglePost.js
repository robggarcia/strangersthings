import { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  deletePostByID,
  fetchUser,
  messageUser,
  messageUserRequest,
} from "../api";
import EditPost from "./EditPost";

import "./SinglePost.css";

const SinglePost = ({
  token,
  posts,
  setPosts,
  setUser,
  getUser,
  setDisplayMessage,
  setSuccess,
}) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const singlePost = posts.filter((post) => post._id === postId)[0];
  console.log(singlePost);

  const UserButtons = () => {
    const handleDelete = async () => {
      const info = await deletePostByID(postId, token);
      if (info.success) {
        const updatedPosts = posts.filter((post) => post._id !== postId);
        setPosts(updatedPosts);
        setSuccess(true);
        setDisplayMessage(`Success: Post "${singlePost.title}" deleted!`);
        navigate("/posts");
      }
    };
    return (
      <div className="user-buttons">
        <button className="delete-button" onClick={handleDelete}>
          DELETE
        </button>
        <Link id="edit" to="edit">
          <button>EDIT</button>
        </Link>
      </div>
    );
  };

  const MessageUser = () => {
    const [message, setMessage] = useState("");

    const handleMessageInput = (e) => {
      setMessage(e.target.value);
    };

    const sendMessage = async (e) => {
      e.preventDefault();
      const info = await messageUserRequest(postId, token, message);
      console.log("RETURNED MESSAGE INFO: ", info);
      if (info.success) {
        const newUser = await fetchUser(token);
        setUser(newUser);
        setSuccess(true);
        setDisplayMessage(
          `Success: Message "${message}" sent to user "${singlePost.author.username}" for post: "${singlePost.title}"`
        );
      }
      getUser();
      setMessage("");
    };

    return (
      <div className="message-user">
        <h4>Message user about This Post</h4>
        <form id="message-form" onSubmit={sendMessage}>
          <input type="text" value={message} onChange={handleMessageInput} />
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    );
  };

  return (
    <div className="single-post">
      {singlePost && (
        <div className="post-and-edit">
          <div className="post">
            <h3>{singlePost.title}</h3>
            <p className="description">{singlePost.description}</p>
            <div className="detail">
              <p className="price-title">Price: </p>
              <p className="content">{singlePost.price}</p>
            </div>
            <div className="detail">
              <h4 className="seller-title">Seller: </h4>
              <h4 className="content">{singlePost.author.username}</h4>
            </div>
            <div className="detail">
              <p className="location-title">Location: </p>
              <p className="content">{singlePost.location}</p>
            </div>
            {singlePost.isAuthor ? <UserButtons /> : <MessageUser />}
          </div>
          {/* include a nested route when the url changes to /edit */}
          <Routes>
            <Route
              path="edit"
              element={
                <EditPost
                  singlePost={singlePost}
                  token={token}
                  setPosts={setPosts}
                  posts={posts}
                  setDisplayMessage={setDisplayMessage}
                  setSuccess={setSuccess}
                />
              }
            />
          </Routes>
        </div>
      )}

      {singlePost.isAuthor && (
        <div className="messages">
          <h3>Messages regarding this post:</h3>
          {singlePost.messages.map((message) => {
            return (
              <div className="message" key={message._id}>
                <h3>From: {message.fromUser.username}</h3>
                <p>{message.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SinglePost;
