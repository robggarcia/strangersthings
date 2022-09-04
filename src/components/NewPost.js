import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../App";

const NewPost = ({ token, posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });

    const info = await response.json();

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
    <div>
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
