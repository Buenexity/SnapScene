import React from "react";
import { Link } from "react-router-dom";

import { TbPolaroid } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";

import "./Headers.css";

function AppHeader() {
  return (
    <nav className="nav">
      <div className="navbar-container">
        <Link to="/home">
          <TbPolaroid className="TbPolaroid" />
        </Link>
        <div className="search-input-container">
          <FaSearch className="FaSearch" />
          <input className="navbar-input" placeholder="Search" />
        </div>
        <Link to="/profile">
          <RiAccountCircleFill className="RiAccountCircleFill" />
        </Link>
      </div>
    </nav>
  );
}

export default AppHeader;
