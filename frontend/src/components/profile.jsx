import { useState, useEffect } from "react";
import axios from "axios";
import uploadFile from "./UploadFile"; // Importing uploadFile function
import ProfileInfo from "./Profiling";
import def_image from "../../public/default_pfp.webp";
import ImagePost from "./ImagePost";
import "../../styles/Profile.css";
import UploadImages from "./UploadPhotos";
import AppHeader from "./Headers";

function Profile({ user }) {
  const [profileImageUrl, setProfileImageUrl] = useState(def_image);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [userViewing, setUserViewing] = useState(null);
  const [ProfilePosts, setProfilePosts] = useState([]);

  const updateProfilePicture = async (imageUrl) => {
    try {
      console.log("Updating profile picture:", imageUrl);
      await axios.post(
        `http://localhost:8000/update_profile_picture/${encodeURIComponent(user.email)}`,
        { imageUrl }
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
          `http://localhost:8000/get_profile_picture/${encodeURIComponent(user.email)}`
        );
        const imageUrl = response.data.imageUrl || def_image;
        setProfileImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfileImage();
  }, [user.email]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response1 = await axios.get(`http://localhost:8000/user/id/${encodeURIComponent(user.email)}`);
        const userId = response1.data.userId;
        setUserViewing(userId);
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };

    fetchUserIds();
  }, [user.email]);

  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      try {
        if (userViewing) {
          const responseFollowers = await axios.get(`http://localhost:8000/followers/${userViewing}`);
          const followersLength = responseFollowers.data.followers.length;

          const responseFollowing = await axios.get(`http://localhost:8000/following/${userViewing}`);
          const followingLength = responseFollowing.data.following.length;

          setFollowers(followersLength);
          setFollowing(followingLength);
          console.log(following, followers);
        }
      } catch (error) {
        console.error("Error fetching followers and following:", error);
      }
    };

    fetchFollowersAndFollowing();
  }, [userViewing]);


  useEffect(() => {
    async function GetUserImages() {
      try {
        const response = await axios.get(`http://localhost:8000/get_profile_imageposts/${user.email}`);
        const AllProfileImages = response.data.Allimages || [];
        console.log(AllProfileImages);
        setProfilePosts(AllProfileImages);
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    }

    GetUserImages();
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

  const renderProfilePosts = () => 
  {
    return ProfilePosts.map((image, index) => 
      (
      <ImagePost key={index} ImageUrl={image.url} />
    ));
  };

  // Profile 
  return (
    <div className="Profile">
      <AppHeader />
      
      <header className="Profile-header">
        <ProfileInfo
          user={user}
          profileImageUrl={profileImageUrl}
          handleFileUpload={handleFileUpload}
          following={following}
          followers={followers}
        />
      </header>

      <div className="post-container">
        <section className="Profile-posts">
          <h1>Posts</h1>
        </section>
        <div className="upload-container">
          <button onClick={() => setShowUploadPopup(true)} className="upload-button">Upload Images</button>
          {showUploadPopup && (
            <div className="upload-overlay">
              <div className="upload-popup">
                <UploadImages user={user} onClose={handleCloseUploadPopup} />
                <button onClick={handleCloseUploadPopup}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr/>
      {renderProfilePosts()}
    </div>
  );
}

export default Profile;
