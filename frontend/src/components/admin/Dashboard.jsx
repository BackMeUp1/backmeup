import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import Cookies from 'js-cookie';

const AdminDashboard = () => {
  const handleLogout = () => {
    Cookies.remove('token'); 
    };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <ul className="nav">
          <li>
            <Link to="/admin/All-project">All Project</Link>
          </li>
          <li>
            <Link to="/admin/users">User</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;