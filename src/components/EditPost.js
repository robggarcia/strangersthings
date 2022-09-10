import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editPostByID, fetchPosts } from "../api";

const EditPost = ({
  singlePost,
  token,
  setPosts,
  setDisplayMessage,
  setSuccess,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(singlePost.title);
  const [description, setDescription] = useState(singlePost.description);
  const [price, setPrice] = useState(singlePost.price);
  const [location, setLocation] = useState(singlePost.location);
  const [willDeliver, setWillDeliver] = useState(singlePost.willDeliver);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = await editPostByID(
      singlePost._id,
      token,
      title,
      description,
      price,
      location,
      willDeliver
    );
    if (info.success) {
      const newPosts = await fetchPosts(token);
      setPosts(newPosts.data.posts);
      setSuccess(true);
      setDisplayMessage(`Success: Updated Post: "${title}"`);
    }

    navigate(`/posts/${singlePost._id}`);
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
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          placeholder="Title *"
          required
        />
        <input
          type="text"
          value={description}
          onChange={handleDescription}
          placeholder="Description *"
          required
        />
        <input
          type="text"
          value={price}
          onChange={handlePrice}
          placeholder="Price *"
          required
        />
        <input
          type="text"
          value={location}
          onChange={handleLocation}
          placeholder="Location"
        />
        <div className="checkbox">
          <input
            type="checkbox"
            id="willDeliver"
            name="willDeliver"
            onChange={handleWillDeliver}
            value={willDeliver}
            checked={willDeliver}
          />
          <label htmlFor="deliver"> Willing to Deliver?</label>
        </div>
        <button>SAVE</button>
      </form>
    </div>
  );
};

export default EditPost;
