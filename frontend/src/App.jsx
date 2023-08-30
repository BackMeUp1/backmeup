
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import SecondNavbar from './components/SecondNavbar';
// import ProjectList from './components/ProjectList';
// import Home from './components/Home';
// import ProjectDetail from './components/ProjectDetail';
// function App() {
//   const [selectedProject, setSelectedProject] = useState(null);

//   // Callback function to receive data from ProjectList
//   const handleProjectSelect = (project) => {
//     setSelectedProject(project);
//   };
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/Home" element={<Home />} />
//         <Route path="/" element={<MainContent />} />
//         <Route path="/detail/:id" element={<ProjectDetail />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function MainContent() {
//   return (
//     <>
//       <SecondNavbar />
//       <ProjectList onProjectSelect={handleProjectSelect}/>
      
//     </>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SecondNavbar from './components/SecondNavbar';
import ProjectList from './components/ProjectList';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import axios from 'axios';
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
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<MainContent projects={projects} />} />
        <Route
          path="/detail/:id"
          element={<ProjectDetail project={selectedProject} />}
        /> 
      </Routes>
    </BrowserRouter>
  );
}

function MainContent() {
  return (
    <>
      <SecondNavbar />
      <ProjectList projects={projects} />
    </>
  );
}

export default App;