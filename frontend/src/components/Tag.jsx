import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./Headers";
import ImagePost from "./ImagePost";
import axios from "axios";
import "../../styles/Tag.css";

function Tag({ tagList }) {
  const tag = useParams().tag;

  // currently not working because tagList initially starts as null
  if (!tagList.includes(tag)) {
    //console.log(typeof tagList);
    //console.log(tagList);
    //throw new Error("Tag not in tag list");
  }

  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    async function getTagImages() {
      try {
        const response = await axios.get(
          `http://localhost:8000/filterImage/${tag}`
        );
        setTagPosts(response.data.Allimages);
      } catch (error) {
        console.log("Error fetching tag photos", error);
      }
    }

    getTagImages();
  }, [tag]);

  const postStyle = {
    display: tagPosts === undefined || tagPosts.length == 0 ? "flex" : "grid",
  };

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
      <ImagePost key={index} ImageUrl={image.images.url} />
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
