
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProjectList.css';
// import ProjectDetail from './ProjectDetail'

// const ProjectList = () => {
  
//   const [projects, setProjects] = useState([]); 
//   const [selectedProject, setSelectedProject] = useState(null); // New state to track the selected project
//   const handleImageClick = (project) => { // Handle image click event
//     setSelectedProject(project);
//   };

//   useEffect(() => {
    
//     axios.get('http://localhost:4000/api/project/get')
//       .then(response => {
//         setProjects(response.data); 
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div className='list' >
//       {/* <span onClick={toggleMenu}>All categories</span> */}
//       <ul>
//         {projects.map((project, index) => (
//           <li key={index}>
//             <ProjectDetail project={project} />
//             <img src={project.image} alt="image"
//                      onClick={() => handleImageClick(project)} />
//             <h3>{project.title}</h3>
//             <p>{project.description}</p>
//             <p>Goal: ${project.goal_amount}</p>
//             <p>Current amount: ${project.current_amount}</p>
//             <p>Start Date: {project['start-date']}</p>
//             <p>End Date: {project['end-date']}</p>
//             <p>{project.comment}</p>
//             <button>Donate</button>
//           </li>
//         ))}
//       </ul>
//       {selectedProject && <ProjectDetail project={selectedProject} />}
//     </div>
//   );
// };

// export default ProjectList;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/project/get')
//       .then(response => {
//         setProjects(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching projects:', error);
//       });
//   }, []);

//   return (
//     <div>
    
//       <div>
//         <h2>All Projects</h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="project-list">
//             {projects.map(project => (
//               <div key={project.id} className="project-card">
//                 <h3>{project.title}</h3>
//                 <p>{project.description}</p>
//                 <p>Goal: ${project.goal_amount}</p>
//                 <p>Current amount: ${project.current_amount}</p>
//                 <p>Start Date: {project['start-date']}</p>
//                 <p>End Date: {project['end-date']}</p>
//                 <p>{project.comment}</p>
//                 <img src={project.image} alt="Project" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectList;

import React, { useState, useEffect } from 'react';

import './ProjectList.css';
import ProjectDetail from './ProjectDetail';

const ProjectList = (props) => {
  console.log(props,"my props");
  
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageClick = (project) => {
    setSelectedProject(project);
  };

 

  return (
    <div className="list">
      <ul>
        {props.projects.map((project, index) => (
          <li key={index}>
            <img
              src={project.image}
              alt="image"
              onClick={() => props.onProjectSelect(project)}
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Goal: ${project.goal_amount}</p>
            <p>Current amount: ${project.current_amount}</p>
            <p>Start Date: {project['start-date']}</p>
            <p>End Date: {project['end-date']}</p>
            <p>{project.comment}</p>
            <button>Donate</button>
          </li>
        ))}
      </ul>
      {selectedProject && <ProjectDetail project={selectedProject} />}
    </div>
  );
};

export default ProjectList;