import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ posts, user, sent, setSinglePost }) => {
  console.log("USER: ", user);
  console.log("SENT: ", sent);

  const activePosts = posts.filter((post) => post.active);
  const withMessages = activePosts.filter((post) => post.messages.length > 0);
  console.log(withMessages);

  const handleLink = (e) => {
    const postToView = posts.find((post) => post._id === e.target.id);
    setSinglePost(postToView);
  };

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <h3>Messages Recieved:</h3>
      <div className="messages">
        {withMessages.map((post) => {
          return (
            <div className="post">
              {post.messages.map((message) => {
                return (
                  <div className="message" key={message._id}>
                    <p>From: {message.fromUser.username}</p>
                    <p>{message.content}</p>
                  </div>
                );
              })}
              <Link
                to={`/posts/${post._id}`}
                id={post._id}
                onClick={handleLink}
              >
                VIEW MY POST: {post.title}
              </Link>
            </div>
          );
        })}
      </div>
      <h3>Messages Sent:</h3>
      <div className="messages">
        {sent.map((message) => {
          return (
            <div className="message">
              <p>(Sent by me)</p>
              <p>{message.content}</p>
              <Link
                to={`/posts/${message.post._id}`}
                id={message.post._id}
                onClick={handleLink}
              >
                MESSAGE AGAIN: {message.post.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
