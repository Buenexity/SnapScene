import { Link } from "react-router-dom";

import "../../styles/ImagePost.css";

function ImagePost({ ImageUrl, id, imgArray }) {
  return (
    <div className="post">
      <Link
        to={`/posts/${id}`}
        state={{ imgArray: imgArray }}
        className="image-link"
      >
        <img src={ImageUrl} alt="Image Post" className="post-image" />
      </Link>
    </div>
  );
}

export default ImagePost;
