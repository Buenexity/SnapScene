import AppHeader from './Headers.jsx'
import '/styles/Home.css'

function Home({ user }) {

  // we can generate the most popular tags up here then past them to the anchor tags below

  return (
    <div>
      <AppHeader/>

      <div className='home-container'>
        {user && (
          <h1>Welcome, {user.username}</h1>
        )}

        <h1>Explore</h1>

        <div className='tag-wrapper'>
          <a id='tag1' href='#'>Tag 1</a>
          <a id='tag2' href='#'>Tag 2</a>
          <a id='tag3' href='#'>Tag 3</a>
          <a id='tag4' href='#'>Tag 4</a>
          <a id='tag5' href='#'>Tag 5</a>
          <a id='tag6' href='#'>Tag 6</a>
        </div>
      </div>

    </div>
  );
}

export default Home;
