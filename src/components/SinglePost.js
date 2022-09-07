import { useEffect } from "react";
import { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  deletePostByID,
  fetchUser,
  messageUser,
  messageUserRequest,
} from "../api";
import { BASE_URL } from "../App";
import EditPost from "./EditPost";

const SinglePost = ({ token, user, posts, setPosts, setUser }) => {
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
        navigate("/posts");
      }
    };
    return (
      <>
        <button onClick={handleDelete}>DELETE</button>
        <Link to="edit">
          <button>EDIT</button>
        </Link>
      </>
    );
  };

  const MessageUser = () => {
    const [message, setMessage] = useState("");

    const handleMessageInput = (e) => {
      setMessage(e.target.value);
      console.log(message);
    };

    const sendMessage = async (e) => {
      e.preventDefault();
      const info = await messageUserRequest(postId, token, message);
      console.log(info);
      if (info.success) {
        const newUser = await fetchUser(token);
        setUser(newUser);
      }
      setMessage("");
    };

    return (
      <div className="message">
        <h4>Message user about This Post</h4>
        <form id="message-form" onSubmit={sendMessage}>
          <input type="text" value={message} onChange={handleMessageInput} />
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    );
  };

  if (!singlePost) {
    return <> </>;
  }

  return (
    <div>
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
            />
          }
        />
      </Routes>
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
