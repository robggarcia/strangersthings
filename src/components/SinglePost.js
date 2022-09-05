import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../App";

const SinglePost = ({ token, singlePost, user, setPosts, posts }) => {
  const params = useParams();
  const navigate = useNavigate();

  const UserButtons = () => {
    const handleDelete = async () => {
      const response = await fetch(`${BASE_URL}/posts/${singlePost._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await response.json();
      if (info.success) {
        const updatedPosts = posts.filter(
          (post) => post._id !== singlePost._id
        );
        setPosts(updatedPosts);
        navigate("/posts");
      }
    };
    return (
      <>
        <button onClick={handleDelete}>DELETE</button>
        <button>EDIT</button>
      </>
    );
  };

  /*   const handleDelete = async () => {
    const result = await deletePostByID(singlePost._id, token);
    setPosts([...posts]);
    console.log("DELETE RESULT: ", result);
    navigate("/posts");
  }; */

  const MessageUser = () => {
    const [message, setMessage] = useState("");

    const handleMessageInput = (e) => {
      setMessage(e.target.value);
      console.log(message);
    };

    const sendMessage = async (e) => {
      e.preventDefault();
      const response = await fetch(
        `${BASE_URL}/posts/${singlePost._id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: `${message}`,
            },
          }),
        }
      );
      const info = await response.json();
      console.log(info);
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
