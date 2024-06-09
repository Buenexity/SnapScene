import { useState } from "react";
import uploadFile from "./UploadFile";
import axios from "axios";
import "../../styles/UploadPhotos.css";

function UploadImages({ user, onClose }) {
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");

  // Handle adding tags to the array
  function handleTagChange(e) {
    const value = e.target.previousElementSibling.value.trim();
    if (value) {
      setTags([...tags, value]);
      e.target.previousElementSibling.value = "";
    }
  }

  // Handle file upload and display image preview
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString(); //parse to string
    try {
      const uploadedImageUrl = await uploadFile(image);

      const sendImage = {
        url: uploadedImageUrl,
        tags: tags,
        comments: [],
        title: imageTitle,
        Date: currentDate,
      };

      console.log(sendImage);

      await axios.post(
        `http://localhost:8000/addImage/${encodeURIComponent(user.email)}`,
        sendImage,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Image uploaded successfully");
      onClose(); //close after submitting
    } catch (error) {
      console.error("Error with uploading image:", error);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload">
        <form className="ImageForm" onSubmit={handleSubmit}>
          {image && (
            <img
              id="ImageDisplay"
              src={URL.createObjectURL(image)}
              alt="Preview"
            />
          )}

          <input type="file" id="fileInput" onChange={handleFileUpload} />

          <input
            type="text"
            id="ImageTitle"
            placeholder="Title"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />

          <div>
            <input type="text" placeholder="Enter tag" />
            <button type="button" onClick={handleTagChange}>
              Add Tag
            </button>
          </div>

          <button type="submit">Upload</button>
        </form>

        <div className="tags">
          <h3>Tags:</h3>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadImages;
