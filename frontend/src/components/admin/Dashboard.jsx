import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './AdminDashboard.css';
import AllProject from './AllProjects.jsx';
import Demande from "./Demande"
import UserList from './userList';


const AdminDashboard = (props) => {
  const {projects} =props
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <ul className="nav">
          <li>
            <Link to="/admin/All-project">All Project</Link>
          </li>
          <li>
            <Link to="/admin/users">User </Link>
          </li>
          <li>
            <Link to="/admin/Demande">Demande</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="/admin/All-project" element={<AllProject projects/>} />
          <Route path="/admin/projects" element={<ProjectList />} />
          <Route path="/admin/list" element={<Demande />} />
          <Route path="/admin/users" element={<UserList />} />
        </Routes>
      </div>
    </div>
  );
};


const ProjectList = () => {
  // Implement the component logic for displaying the list of projects
  // This component will fetch the project data from the API and render it
  return (
    <div>
      <h2>Projects</h2>
      <p>List of projects goes here.</p>
    </div>
  );
};



export default AdminDashboard;