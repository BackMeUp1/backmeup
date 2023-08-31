import React, { useState, useEffect } from 'react';

import './ProjectList.css';
import ProjectDetail from './ProjectDetail';

const ProjectList = (props) => {
  const {projects} =props  
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageClick = (project) => {
    setSelectedProject(project);
  };

 

  return (
    <div className="list">
      <ul>
        {projects.map((project, index) => (
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
            <p>{project.categories}</p>

            <button>Donate</button>
          </li>
        ))}
      </ul>
      {selectedProject && <ProjectDetail project={selectedProject} />}
    </div>
  );
};

export default ProjectList;