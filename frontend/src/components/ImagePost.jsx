import "../../styles/ImagePost.css"

function ImagePost({ ImageUrl, WebLinkUrl }) {

    return (
        <div className="post">
            <a href={WebLinkUrl} className="image-link">
                <img src={ImageUrl} alt="Image Post" className="post-image" />
            </a>
        </div>
    );
}

export default ImagePost;
