import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SecondNavbar from './components/SecondNavbar';
import ProjectList from './components/ProjectList';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import axios from 'axios';
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
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

  return (
    <BrowserRouter>
      <Navbar />
    <SecondNavbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<MainContent projects={projects} />} />
        <Route
          path="/detail/:id"
          element={<ProjectDetail project={selectedProject} />}
        /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}


export default App;

