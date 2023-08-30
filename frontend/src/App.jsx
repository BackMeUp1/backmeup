import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SecondNavbar from './components/SecondNavbar';
import ProjectList from './components/ProjectList';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import axios from 'axios';
import Footer from "./components/Footer"; // Import the Footer component
import Dashboard from './components/admin/dashboard.jsx'
import SearchOne from "./components/SearchOne";



function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


 
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
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

const ProtectedRoute = ({ children, user }) => {
  const isAuthenticated = user !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};
  
   const [user, setUser] = useState(null);
  
  const isAuthenticated = localStorage.getItem('token') !== true;

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
              const response = await fetch('URL_TO_FETCH_USER_DATA', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [isAuthenticated]);
  
  
   const stalSearch =(str) => {
    setSearchQuery(str);

  };
  return (
    <BrowserRouter>
      <Navbar data={data} stal={stalSearch } />
    <SecondNavbar />
      <Routes>
            <Route path="/login" element={<Login />} />
       <Route
             path="/home"
             element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
                      }
        />
        <Route path="/" element={<MainContent projects={projects} />} />
        <Route
          path="/detail/:id"
          element={<ProjectDetail project={selectedProject} />}
        /> 
        <Route path="/search" element={<SearchOne str={searchQuery}  data={data}/>} />
 <Route path="/admin/Dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
