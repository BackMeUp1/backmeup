import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css"; // You can create a CSS file for styling

const AdminNavbar = (props) => {
  const { search } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    search(newSearchTerm);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">Admin Dashboard</div>
      <ul className="admin-navbar-links">
        <li className="admin-navbar-item">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="admin-navbar-item">
          <Link to="/admin/All-project">All Projects</Link>
        </li>
        <li className="admin-navbar-item">
          <Link to="/admin/users">All Users</Link>
        </li>
      </ul>
      <div className="admin-navbar-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ color: "#000" }} // Set text color to black
        />
      </div>
    </nav>
  );
};

export default AdminNavbar;
