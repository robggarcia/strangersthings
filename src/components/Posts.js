import { Link, useNavigate } from "react-router-dom";
import "./Posts.css";

const Posts = ({ posts, token, user, setSinglePost }) => {
  const navigate = useNavigate();

  return (
    <div className="posts">
      <h1>Posts</h1>
      <Link to="/posts/new">ADD POST</Link>
      {posts.map((post) => {
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
