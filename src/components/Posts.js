import "./Posts.css";

const Posts = ({ posts }) => {
  console.log("posts", posts);
  return (
    <div className="posts">
      <h1>Posts</h1>
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
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
