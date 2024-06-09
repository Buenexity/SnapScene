import "../../styles/ImagePost.css";

function ImagePost({ ImageUrl }) {
  return (
    <div className="post">
      <a href={ImageUrl} className="image-link">
        <img src={ImageUrl} alt="Image Post" className="post-image" />
      </a>
    </div>
  );
}

export default ImagePost;
