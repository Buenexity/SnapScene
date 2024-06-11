import "/styles/Profiling.css";
import ConnectionsList from "./ConnectionsList";

const ProfileInfo = ({
  user,
  profileImageUrl,
  handleFileUpload,
  followers,
  following,
}) => {
  return (
    <div className="Total-Profile">
      <div className="Profile-info">
        <div className="Profile-picture">
          <label htmlFor="fileInput">
            <img src={profileImageUrl} alt={`${user.username}'s profile`} />
            <div className="Change-image-overlay"></div>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className="Profile-text">
          <h1 id="Username">@{user.username}</h1>
          <div className="Profile-stats">
            <div className="Profile-stats-item">
              <h2>Followers: {followers}</h2>
            </div>
            <div id="Following-Stats" className="Profile-stats-item">
              <h2>Following: {following}</h2>
            </div>
          </div>
          <div className="Connections-container">
            {console.log("Recieving Email to Profile Info",user.email)}
            <ConnectionsList userEmail={user.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
