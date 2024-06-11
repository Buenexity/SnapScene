import AppHeader from "./Headers.jsx";
import "/styles/Home.css";

function Home({ user, tags }) {
  return (
    <div>
      <AppHeader user={user} tags={tags} />

      <div className="home-container">
        {user && <h1>Welcome, {user.username}</h1>}

        <h1>Explore</h1>

        <div className="tag-wrapper">
          <a id="tag1" href={"http://localhost:3000/tags/" + tags[0]}>
            {tags[0]}
          </a>
          <a id="tag2" href={"http://localhost:3000/tags/" + tags[1]}>
            {tags[1]}
          </a>
          <a id="tag3" href={"http://localhost:3000/tags/" + tags[2]}>
            {tags[2]}
          </a>
          <a id="tag4" href={"http://localhost:3000/tags/" + tags[3]}>
            {tags[3]}
          </a>
          <a id="tag5" href={"http://localhost:3000/tags/" + tags[4]}>
            {tags[4]}
          </a>
          <a id="tag6" href={"http://localhost:3000/tags/" + tags[5]}>
            {tags[5]}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
