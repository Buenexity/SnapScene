import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./Headers";
import ImagePost from "./ImagePost";
import axios from "axios";
import "../../styles/Tag.css";

function Tag(tagList) {
  const tag = useParams();

  // currently not working because tagList initially starts as null
  if (!tagList.tagList.includes(tag.tag)) {
    console.log(typeof tagList.tagList);
    console.log(tagList.tagList);
    //throw new Error("Tag not in tag list");
  }

  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    async function getTagImages() {
      try {
        const response = await axios.get(
          `http://localhost:8000/filterImage/${tag.tag}`
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
  }, [tag.tag]);

  // useEffect(() => {
  //   console.log(tagPosts);
  // }, [tagPosts]);

  const renderProfilePosts = () => {
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

      <h1>{tag.tag}</h1>

      <div className="posts">{renderProfilePosts()}</div>
    </div>
  );
}

export default Tag;
