import { Link } from "react-router-dom";

import "./Profile.css";

const Profile = ({ posts, user, sent }) => {
  console.log("USER: ", user);
  console.log("SENT: ", sent);

  const activePosts = posts.filter((post) => post.active);
  const withMessages = activePosts.filter((post) => post.messages.length > 0);
  console.log(withMessages);

  return (
    <div className="profile">
      {user && (
        <>
          <h1>Welcome {user.username}!</h1>
          <h3>Messages Recieved:</h3>
          <div className="messages">
            {withMessages.map((post) => {
              return (
                <div key={post._id}>
                  {post.messages.map((message) => {
                    return (
                      <div className="message" key={message._id}>
                        <p>From: {message.fromUser.username}</p>
                        <p>{message.content}</p>
                        <Link to={`/posts/${post._id}`} id={post._id}>
                          VIEW MY POST: {post.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <h3>Messages Sent:</h3>
          <div className="messages">
            {sent.map((message, i) => {
              return (
                <div className="message" key={i}>
                  <p>(Sent by me)</p>
                  <p>{message.content}</p>
                  <Link to={`/posts/${message.post._id}`} id={message.post._id}>
                    MESSAGE AGAIN: {message.post.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
