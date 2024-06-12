import { useRef, useState } from "react";
import "/styles/Headers.css";
import SnapSceneLogo from "/public/SnapScene.png";
import { useNavigate } from "react-router-dom";

function AppHeader({ user, tags }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearch = (event) => {
    const searchInput = inputRef.current.value;
    event.preventDefault();

    if (!searchInput) {
      return;
    }

    if (searchInput[0] === "@") {
      navigate("/profile/" + searchInput.slice(1), { state: { user: user } });
    } else {
      navigate("/tags/" + searchInput), { state: { user: user, tags: tags } };
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-light navbar-light"
      style={{ borderBottom: "2px solid lightgrey" }}
    >
      <div className="container">
        <a className="navbar-brand" href="http://localhost:3000/home/">
          <img src={SnapSceneLogo} alt="SnapScene logo" />
          SnapScene
        </a>

        <form className="form-inline" onSubmit={handleSearch}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            ref={inputRef}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link mx-2" href="http://localhost:3000/tags/">
                <i className="fas fa-plus-circle pe-2"></i>Tags
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link mx-2"
                href="http://localhost:3000/profile/"
              >
                <i className="fas fa-heart pe-2"></i>Profile
              </a>
            </li>
            <li className="nav-item ms-3">
              <a
                className="btn btn-black btn-rounded"
                href="http://localhost:3000/"
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
