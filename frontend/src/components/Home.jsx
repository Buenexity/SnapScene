import AppHeader from './Headers.jsx'

function Home({ user }) {
  return (
    <div>
      <AppHeader/>
      {user && (
        <h1>Welcome, {user.username}</h1>
      )}
    </div>
  );
}

export default Home;
