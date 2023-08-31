import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './AdminDashboard.css'; // Make sure to create this CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <ul className="nav">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/add-project">Add Project</Link>
          </li>
          <li>
            <Link to="/admin/projects">Projects</Link>
          </li>
          <li>
            <Link to="/admin/list">List</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        {/* Render the selected component based on the route */}
        
      </div>
    </div>
  );
};

export default AdminDashboard;