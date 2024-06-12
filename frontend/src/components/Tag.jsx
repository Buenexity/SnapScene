import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./Headers";
import ImagePost from "./ImagePost";
import axios from "axios";
import "../../styles/Tag.css";

function Tag() {
  const tag = useParams().tag;
  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    async function getTagImages() {
      try {
        const response = await axios.get(
          `http://localhost:8000/filterImage/${tag}`
        );
        // setTagPosts(response.data.Allimages);
        const images = response.data.Allimages.map((post) => post.images);
        setTagPosts(images);

        // console.log(tagPosts)
      } catch (error) {
        console.log("Error fetching tag photos", error);
      }
    }

    getTagImages();
  }, [tag]);

  const postStyle = {
    display: tagPosts === undefined || tagPosts.length == 0 ? "flex" : "grid",
  };

  // useEffect(() => {
  //   console.log(tagPosts);
  // }, [tagPosts]);

  const renderProfilePosts = () => {
    console.log(tagPosts);
    console.log(!tagPosts);
    if (tagPosts === undefined || tagPosts.length == 0) {
      console.log("There are no posts");
      return (
        <div
          style={{
            textAlign: "center",
            marginInline: "auto",
          }}
        >
          <h2>There are no posts for this tag.</h2>
          <h2>Create one by uploading photos!</h2>
        </div>
      );
    }
    return tagPosts.map((image, index) => (
      <ImagePost
        key={index}
        ImageUrl={image.url}
        id={image._id}
        imgArray={tagPosts}
      />
    ));
  };

  return (
    <div className="tag-container">
      <AppHeader />

      <h1>{tag}</h1>

      <div className="posts" style={postStyle}>
        {renderProfilePosts()}
      </div>
    </div>
  );
}

export default Tag;
