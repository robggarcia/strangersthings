import { useState } from "react";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = ({ posts, token }) => {
  const [search, setSearch] = useState("");
  const [postsToShow, setPostsToShow] = useState(posts);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchPosts = posts.filter((post) => {
      if (
        post.title.toLowerCase().includes(e.target.value) ||
        post.description.toLowerCase().includes(e.target.value) ||
        post.location.toLowerCase().includes(e.target.value) ||
        post.author.username.toLowerCase().includes(e.target.value)
      ) {
        return post;
      }
    });
    setPostsToShow(searchPosts);
    console.log(postsToShow);
  };

  return (
    <div className="posts">
      <h1>Posts</h1>
      <div className="post-controls">
        <input id="search" value={search} onChange={handleSearch} />
        <label htmlFor="search"> Search Posts</label>
        <Link to="/posts/new" id="add-post">
          <button>ADD POST</button>
        </Link>
      </div>
      <div className="post-container">
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
                <Link to={post._id}>
                  <button>{post.isAuthor ? "VIEW" : "SEND MESSAGE"}</button>
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
