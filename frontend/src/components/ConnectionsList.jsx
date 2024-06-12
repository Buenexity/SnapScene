import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "/styles/Connection.css";

function ConnectionsList({ userEmail }) {
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        console.log("ConnectionsList-eIn ConnectionsList", userEmail);
        const response = await axios.get(`http://localhost:8000/followstats/${userEmail}`);
        const { followers, following } = response.data;
        setFollowersList(followers || []);
        setFollowingList(following || []);
        console.log("followerlist", followers);
      } catch (error) {
        console.error("Error fetching followers and following:", error);
      }
    };
  
    fetchConnections();
  }, [userEmail]); 

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
  };
  return (
    <div className="connections">
      <div className="Followers" style={{ width: "200px" }}> 
        <button className="toggle-button" onClick={toggleFollowers}>
          {showFollowers ? "▲" : "▼"}
        </button>
        {showFollowers && (
          <ul className="scrollable-list1" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {followersList.map((follower, index) => (
              <li key={index}>
                <Link to={`/profile/${follower.username}`}>
                  <img className="Pfp" src={follower.profile} />
                  {follower.username}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="Followees" style={{ width: "200px" }}> 
        <button className="toggle-button" onClick={toggleFollowing}>
          {showFollowing ? "▲" : "▼"}
        </button>
        {showFollowing && (
          <ul className="scrollable-list" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {followingList.map((followee, index) => (
              <li key={index}>
                <Link to={`/profile/${followee.username}`}>
                  <img className="Pfp" src={followee.profile} />
                  {followee.username}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ConnectionsList;
