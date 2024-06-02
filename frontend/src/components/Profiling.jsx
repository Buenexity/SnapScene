import React from "react";
import "/styles/Profiling.css";

const ProfileInfo = ({ user, profileImageUrl, handleFileUpload }) => (
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
        <h1 id="Username">{user.username}</h1>
        <div className="Profile-stats">
          <div className="Profile-stats-item">
            <h2>Followers</h2>
          </div>
          <div id="Following-Stats" className="Profile-stats-item">
            <h2>Following</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileInfo;