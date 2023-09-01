
// import React from 'react';

// import './ProjectList.css'
// import { useNavigate } from 'react-router-dom'


// const ProjectList = (props) => {
//   const navigate = useNavigate();
//   const { projects, setSelected ,filProjects,  } = props;
  
  

//   const handleImageClick = (project) => {
//     setSelected(project);
//     navigate('/ProjetDetail');
//   };
//   const projectsToRender = filProjects && filProjects.length > 0 ? filProjects : projects;
//   return (
//     <div className="list">
//       <ul>
//         {projectsToRender.map((project, index) => (
//           <li key={index}>
           
//               <img
//                 src={project.image}
//                 alt="image"
//                 onClick={() => {
//                   setSelected(project);
//                   navigate('/ProjectDetail')
//                 }}
//               />
            
//             <h3>{project.title}</h3>
//             <p>{project.description}</p>
//             <p>Goal: ${project.goal_amount}</p>
//             <p>Current amount: ${project.current_amount}</p>
//             <p>Start Date: {project['start-date']}</p>
//             <p>End Date: {project['end-date']}</p>
//             <p>{project.comment}</p>
//             <p>{project.categories}</p>
//             <p>Category: {project.categories}</p>
//             <button>Donate</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProjectList;


// import React from 'react';
// import './ProjectList.css';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// const ProjectList = (props) => {
//   const navigate = useNavigate();
//   const { projects, setSelected, filProjects } = props;
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   const handleImageClick = (project) => {
//     setSelected(project);
//     navigate('/ProjectDetail');
//   };

//   const projectsToRender = filProjects && filProjects.length > 0 ? filProjects : projects;

//   return (
//     <div className="list-container">
//       <ul className="project-list">
//         {projectsToRender.map((project, index) => (
//           <li className="project-item" key={index}>
//             <img
//               src={project.image}
//               alt={project.title}
//               onClick={() => {
//                 setSelected(project);
//                 navigate('/ProjectDetail');
//               }}
//               className="project-image"
//             />
//             <div className="project-details">
//               <h3 className="project-title">{project.title}</h3>
//               <p className="project-description">{project.description}</p>
//               <p className="project-info">Goal: ${project.goal_amount}</p>
//               <p className="project-info">Current amount: ${project.current_amount}</p>
//               <p className="project-info">Start Date: {project['start-date']}</p>
//               <p className="project-info">End Date: {project['end-date']}</p>
//               <p className="project-info">{project.comment}</p>
//               <p className="project-info">Category: {project.categories}</p>
//               <button className="project-donate-button">Donate</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProjectList;


import React, { useState } from 'react';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';

const ProjectList = (props) => {
  const navigate = useNavigate();
  const { projects, setSelected, filProjects } = props;
  
  // Create an array to store the expanded state for each project
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  const handleImageClick = (project) => {
    setSelected(project);
    navigate('/ProjectDetail');
  };

  const projectsToRender = filProjects && filProjects.length > 0 ? filProjects : projects;

  const toggleDescription = (index) => {
    // Create a new array and toggle the expanded state for the specified project index
    const newExpandedDescriptions = [...expandedDescriptions];
    newExpandedDescriptions[index] = !newExpandedDescriptions[index];
    setExpandedDescriptions(newExpandedDescriptions);
  };

  return (
    <div className="list-container">
      <ul className="project-list">
        {projectsToRender.map((project, index) => (
          <li className="project-item" key={index}>
            <img
              src={project.image}
              alt={project.title}
              onClick={() => {
                setSelected(project);
                navigate('/ProjectDetail');
              }}
              className="project-image"
            />
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">
                {expandedDescriptions[index] || project.description.length <= 100
                  ? project.description
                  : project.description.slice(0, 100)}{/* Display first 100 characters */}
                {project.description.length > 100 && (
                  <button
                    className="read-more-button"
                    onClick={() => toggleDescription(index)}
                  >
                    {expandedDescriptions[index] ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </p>
              <p className="project-info">Goal: ${project.goal_amount}</p>
              <p className="project-info">Current amount: ${project.current_amount}</p>
              <p className="project-info">Start Date: {project['start-date']}</p>
              <p className="project-info">End Date: {project['end-date']}</p>
              <p className="project-info">{project.comment}</p>
              <p className="project-info">Category: {project.categories}</p>
              <button className="project-donate-button" onClick={()=>{
                 navigate('/SubmitDonation');
              }} >Donate</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

 


