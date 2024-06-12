import AppHeader from "./Headers";
import "../../styles/TagPage.css";

function TagPage({ tags }) {
  console.log(typeof tags);
  console.log(tags);

  const renderTags = () => {
    return tags.map((tag, index) => (
      <a className="tag" key={index} href={"http://localhost:3000/tags/" + tag}>
        {tag}
      </a>
    ));
  };

  return (
    <div className="tagPage-container">
      <AppHeader />
      <h1>All Tags</h1>

      <div className="tag-container">{renderTags()}</div>
    </div>
  );
}

export default TagPage;
