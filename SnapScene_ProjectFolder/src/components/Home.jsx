import React from "react";
import AppHeader from "./Headers";

function Home({ user }) {
  return (
    <div>
      <AppHeader />
      {user && <h1>Welcome, {user.username}</h1>}
    </div>
  );
}

export default Home;
