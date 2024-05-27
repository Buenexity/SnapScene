// Home.js
import React from 'react';

function Home({ user }) {
  return (
    <div>
      {user && (
        <h1>Welcome, {user.username}</h1>
      )}
    </div>
  );
}

export default Home;
