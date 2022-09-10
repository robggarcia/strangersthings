import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../api";
import { BASE_URL } from "../App";

import "./NewPost.css";

const NewPost = ({ token, posts, setPosts, setDisplayMessage, setSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = await createNewPost(
      token,
      title,
      description,
      price,
      location,
      willDeliver
    );

    if (info.success) {
      setSuccess(true);
      setDisplayMessage(
        `Success: New Post created with title:"${title}" and description:"${description}" `
      );
    }

    setPosts([...posts, info.data.post]);

    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
    navigate("/posts");
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleWillDeliver = () => {
    setWillDeliver(!willDeliver);
  };

  return (
    <div className="new-post">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title *"
          onChange={handleTitle}
          value={title}
          required
        />
        <input
          type="text"
          placeholder="Description *"
          onChange={handleDescription}
          value={description}
          required
        />
        <input
          type="text"
          placeholder="Price *"
          onChange={handlePrice}
          value={price}
          required
        />
        <input
          type="text"
          placeholder="Location"
          onChange={handleLocation}
          value={location}
        />
        <div className="checkbox">
          <input
            type="checkbox"
            id="willDeliver"
            name="willDeliver"
            onChange={handleWillDeliver}
            value={willDeliver}
          />
          <label htmlFor="deliver"> Willing to Deliver?</label>
        </div>
        <button>CREATE</button>
      </form>
    </div>
  );
};

export default NewPost;
