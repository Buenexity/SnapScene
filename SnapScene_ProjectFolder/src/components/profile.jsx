// Home.js
import React from 'react';

function Profile({ user }) {
  return (
    <div>
      {user && (
        <h1>Profile of {user.username}</h1>
      )}
    </div>
  );
}

export default Profile;