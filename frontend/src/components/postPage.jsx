import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// import AppHeader from "./Headers";

import "../../styles/postPage.css";

const PostPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    const fetchPostsData = async () => {
      try {
        const { imgArray } = location.state || { imgArray: [] };
        setPosts(imgArray);
      } catch (error) {
        setError(error);
      }
    };

    fetchPostData();
    fetchPostsData();
  }, [id, location.state]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/posts/${id}/addComment`,
        { comment: newComment }
      );
      console.log(response.data.message);
      setPost((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data.comment],
      }));
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (direction) => {
    const currIndex = posts.findIndex((post) => post._id === id);
    let newIndex;
    if (direction === "prev") {
      newIndex = currIndex - 1;
    } else if (direction === "next") {
      newIndex = currIndex + 1;
    }
    if (newIndex >= 0 && newIndex < posts.length) {
      const newPath = location.pathname.replace(id, posts[newIndex]._id);
      navigate(newPath, { state: location.state });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading image data</p>;

  return (
    <div className="post-container">
      <div className="image-title-tags-container">
        <img src={post.url} alt={post.title} />
        <h1>{post.title}</h1>
        <p>
          {post.tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </p>
      </div>

      <div className="comments-container">
        {/* comment section */}
        <h2>Comments:</h2>
        <ul>
          {post.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <p>Date: {new Date(post.Date).toLocaleString()}</p>
        {/* add new comment */}
        <form className="new-comment-container" onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className="scroll-buttons-container">
        <button
          onClick={() => handleNavigation("prev")}
          disabled={posts.findIndex((post) => post._id === id) === 0}
        >
          ^
        </button>
        <button
          onClick={() => handleNavigation("next")}
          disabled={
            posts.findIndex((post) => post._id === id) === posts.length - 1
          }
        >
          v
        </button>
      </div>
    </div>
  );
};

export default PostPage;
