import React from "react";

import AppHeader from "./Headers";

function Profile({ user }) {
  return (
    <div>
      <AppHeader />
      {user && <h1>Profile of {user.username}</h1>}
    </div>
  );
}

export default Profile;
