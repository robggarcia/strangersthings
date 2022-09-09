import { useState } from "react";

const MessageUser = () => {
  const [message, setMessage] = useState("");

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const sendMessage = () => {
    console.log("MESSAGE SEND");
    // const response = await fetch(
    //   `${BASE_URL}/posts/${singlePost._id}/messages`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       message: {
    //         content: `${message}`,
    //       },
    //     }),
    //   }
    // );
    // const info = await response.json();
    // console.log(info);
    setMessage("");
  };

  return (
    <div className="message">
      <h4>Message user about This Post</h4>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={handleMessageInput} />
        <button type="submit">SEND MESSAGE</button>
      </form>
    </div>
  );
};

export default MessageUser;
