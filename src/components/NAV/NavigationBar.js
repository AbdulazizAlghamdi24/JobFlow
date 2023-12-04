import React from "react";
import { Link } from "react-router-dom";
import "./NAV.css"; // Importing the styles

function NavigationBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/add-job" className="nav-link">
        Add Job
      </Link>
      <Link to="/my-jobs" className="nav-link">
        My Jobs
      </Link>
    </nav>
  );
}

export default NavigationBar;
