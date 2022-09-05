import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Posts.css";

const Posts = ({ posts, token, user, setSinglePost }) => {
  const [search, setSearch] = useState("");
  const [postsToShow, setPostsToShow] = useState(posts);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setPostsToShow(posts);
    } else {
      setPostsToShow(
        postsToShow.filter((post) => {
          if (
            post.title.toLowerCase().includes(e.target.value) ||
            post.description.toLowerCase().includes(e.target.value) ||
            post.location.toLowerCase().includes(e.target.value)
          ) {
            return post;
          }
        })
      );
    }
  };

  return (
    <div className="posts">
      <h1>Posts</h1>
      <input id="search" value={search} onChange={handleSearch} />
      <label htmlFor="search">Search Posts</label>
      <Link to="/posts/new">ADD POST</Link>
      {postsToShow.map((post) => {
        return (
          <div className="post" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="detail">
              <p className="price-title">Price: </p>
              <p className="content">{post.price}</p>
            </div>
            <div className="detail">
              <h4 className="seller-title">Seller: </h4>
              <h4 className="content">{post.author.username}</h4>
            </div>
            <div className="detail">
              <p className="location-title">Location: </p>
              <p className="content">{post.location}</p>
            </div>
            {token ? (
              <button
                onClick={() => {
                  setSinglePost(post);
                  navigate(`${post._id}`);
                }}
              >
                {post.isAuthor ? "VIEW" : "SEND MESSAGE"}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
