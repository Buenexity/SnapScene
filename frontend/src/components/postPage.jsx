import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import "../../styles/postPage.css"

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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

    fetchPostData();
  }, [id]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading image data</p>

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/posts/${id}/addComment`, { comment: newComment });
      console.log(response.data.message);
      setPost((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data.comment],
      }));
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  }

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

      
    </div>
  )
}

export default PostPage