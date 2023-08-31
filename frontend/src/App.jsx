import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SecondNavbar from './components/SecondNavbar';
import Home from './components/Home';
import ProjectList from "./components/projectList.jsx"
import ProjectDetail from './components/ProjectDetail';
import axios from 'axios';
import Footer from './components/Footer';
import Dashboard from './components/admin/dashboard.jsx';
import SearchOne from './components/SearchOne';
import Login from './components/login.jsx';
import Herosection from './components/Herosection'
function App() {
  const [projects, setProjects] = useState([]);
 
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/project/get')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Callback function to receive data from ProjectList
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const isAuthenticated = localStorage.getItem('token') !== true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('URL_TO_FETCH_USER_DATA', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserData();
    }
  }, []);

  const stalSearch = (str) => {
    setSearchQuery(str);
  };

  const navigateTo = (path) => {
    // Implement your navigation logic here, e.g., window.location.href = path;
  };

  return (
    <BrowserRouter>
      <Navbar stal={stalSearch}  />
      <SecondNavbar />
      
      <Routes>
     {/* <Route path="/" element= { <ProjectList  projects={projects} setSelected={setSelected}/>} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element= {<Herosection projects={projects} />} /> */}

        <Route
          path="/"
          element={
            <>
              {projects.length > 0 && <Herosection projects={projects} />}
              <ProjectList projects={projects} setSelected={setSelected} />
            </>
          }
        />

        <Route
          path="/ProjetDetail"
          element={<ProjectDetail project={selected}  />}
        />
        <Route path="/search" element={<SearchOne str={searchQuery} />} />

        {/* ProtectedRoute for Home */}
        <Route
          path="/home"
          element={<Home user={user} navigateTo={navigateTo} />}
        />

        {/* Admin Dashboard route */}
        <Route
          path="/admin/dashboard"
          element={
            user?.role === 'admin' ? <Dashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
