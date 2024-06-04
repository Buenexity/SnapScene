import { useState, useEffect } from "react";
import axios from "axios";
import uploadFile from "./UploadFile"; // Importing uploadFile function
import ProfileInfo from "./Profiling";
import def_image from "../../public/default_pfp.webp";
import "../../styles/Profile.css";
import UploadImages from "./UploadPhotos";

function Profile({ user }) {
  const [profileImageUrl, setProfileImageUrl] = useState(def_image);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const updateProfilePicture = async (imageUrl) => {
    try {
      console.log("Updating profile picture:", imageUrl);
      await axios.post(
        `http://localhost:5000/update_profile_picture/${encodeURIComponent(user.email)}`,
        { imageUrl },
      );
      console.log("Profile picture updated successfully");
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_profile_picture/${encodeURIComponent(user.email)}`,
        );
        const imageUrl = response.data.imageUrl;
        setProfileImageUrl(imageUrl || def_image);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfileImage();
  }, [user.email]);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      try {
        const downloadURL = await uploadFile(selectedFile);
        setProfileImageUrl(downloadURL);
        await updateProfilePicture(downloadURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleCloseUploadPopup = () => {
    setShowUploadPopup(false);
  };

  return (
    <div className="Profile">
      <header className="Profile-header">
        <ProfileInfo
          user={user}
          profileImageUrl={profileImageUrl}
          handleFileUpload={handleFileUpload}
        />

        <button onClick={() => setShowUploadPopup(true)}>Upload Images</button>
        {showUploadPopup && (
          <div className="upload-overlay">
            <div className="upload-popup">
              <UploadImages user={user} onClose={handleCloseUploadPopup} />
              <button onClick={handleCloseUploadPopup}>Close</button>
            </div>
          </div>
        )}
      </header>

      <section className="Profile-posts">
        <h2>Posts</h2>
      </section>
    </div>
  );
}

export default Profile;
