import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileInfo from "./Profiling";
import { useNavigate } from "react-router-dom";
import ImagePost from "./ImagePost";
import AppHeader from "./Headers";

function DynamicProfile({ user }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [email, setEmail] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [userExists, setUserExists] = useState(true);
  const [userViewing, setUserViewing] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [profilePosts, setProfilePosts] = useState([]);

  // Redirect if the user is viewing their own profile
  useEffect(() => {
    if (user.username === username) {
      navigate("/profile", { state: { user: user } });
    }
  }, [navigate, user, username]);

  // Convert User Name from web-parameters to an email for server.js lookup
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/email/${username}`
        );
        setEmail(response.data.email);
        setUserExists(true);
      } catch (error) {
        console.error("Error fetching email:", error);
        setUserExists(false);
      }
    };

    fetchEmail();
  }, [username]);

  // Load dynamic user image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/get_profile_picture/${encodeURIComponent(
            email
          )}`
        );
        const imageUrl = response.data.imageUrl;
        setProfileImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    if (email) {
      fetchProfileImage();
    }
  }, [email]);

  // Fetch user ids from email to save them onto MongoDB
  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        // Wait until email is set before fetching user IDs
        if (email) {
          const response1 = await axios.get(
            `http://localhost:8000/user/id/${encodeURIComponent(user.email)}`
          );
          const userId = response1.data.userId;
          setUserViewing(userId);
  
          const response2 = await axios.get(
            `http://localhost:8000/user/id/${encodeURIComponent(email)}`
          );
          const userId2 = response2.data.userId;
          setUserAccount(userId2);
        }
      } catch (error) {
        console.error("Error fetching user IDs:", error);
      }
    };
  
    fetchUserIds();
  }, [email, user.email]);

  // Get the size of the followers & following for dynamic Profile
  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      try {
        const responseFollowers = await axios.get(
          `http://localhost:8000/followers/${userAccount}`
        );
        const followersLength = responseFollowers.data.followers.length;

        const responseFollowing = await axios.get(
          `http://localhost:8000/following/${userAccount}`
        );
        const followingLength = responseFollowing.data.following.length;

        setFollowers(followersLength);
        setFollowing(followingLength);
      } catch (error) {
        console.error("Error fetching followers and following:", error);
      }
    };

    if (userViewing) {
      fetchFollowersAndFollowing();
    }
  }, [userAccount]);

  // When user clicks follow, it updates both the dynamic profile and user profile's following/followers stats
  const handleFollowButton = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/follow/${userViewing}`,
        { userToFollowId: userAccount }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  useEffect(() => {
    async function GetUserImages() {
      try {
        const response = await axios.get(
          `http://localhost:8000/get_profile_imageposts/${email}`
        );
        const AllProfileImages = response.data.Allimages || [];
        // console.log(AllProfileImages);
        setProfilePosts(AllProfileImages);
        // console.log(profilePosts);
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    }

    GetUserImages();
  }, [email]);

  // useEffect(() => {
  //   console.log(profilePosts);
  // }, [profilePosts]);

  const renderProfilePosts = () => {
    return profilePosts.map((image, index) => (
      <ImagePost
        key={index}
        ImageUrl={image.url}
        id={image._id}
        imgArray={profilePosts}
      />
    ));
  };

  if (!userExists) {
    return <div>User {username} does not exist.</div>;
  }

  return (
    <div className="Profile">
      <AppHeader />

      <header className="Profile-header">
      {console.log("Sending Email",email)}
        <ProfileInfo
          
          user={{username: username , email:email}}
          profileImageUrl={profileImageUrl}
          followers={followers}
          following={following}
        />
      </header>

      <div className="post-container">
        <section className="Profile-posts">
          <h1>Posts</h1>
        </section>

        <div>
          <button onClick={handleFollowButton} className="upload-button">
            Follow
          </button>
        </div>
      </div>

      <hr />

      <div className="posts">{renderProfilePosts()}</div>
    </div>
  );
}

export default DynamicProfile;
