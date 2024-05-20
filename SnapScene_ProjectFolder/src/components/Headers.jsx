import React, { useState } from "react";
import "./Headers.css";

function AppHeader() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-light navbar-light"
      style={{ borderBottom: "2px solid lightgrey" }}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          SnapScene
        </a>
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
              <a className="nav-link mx-2" href="#!">
                <i className="fas fa-plus-circle pe-2"></i>Tags
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="#!">
                <i className="fas fa-bell pe-2"></i>Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="#!">
                <i className="fas fa-heart pe-2"></i>Profile
              </a>
            </li>
            <li className="nav-item ms-3">
              <a className="btn btn-black btn-rounded" href="#!">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
