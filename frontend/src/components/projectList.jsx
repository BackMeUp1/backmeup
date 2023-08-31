
import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import './ProjectList.css'
import { useNavigate } from 'react-router-dom'


const ProjectList = (props) => {
  const navigate = useNavigate();
  const { projects, setSelected ,filProjects,  } = props;
  
  

  const handleImageClick = (project) => {
    setSelected(project);
    navigate('/ProjetDetail');
  };
  const projectsToRender = filProjects && filProjects.length > 0 ? filProjects : projects;
  return (
    <div className="list">
      <ul>
        {projectsToRender.map((project, index) => (
          <li key={index}>
           
              <img
                src={project.image}
                alt="image"
                onClick={() => {
                  setSelected(project);
                  navigate('/ProjectDetail')
                }}
              />
            
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Goal: ${project.goal_amount}</p>
            <p>Current amount: ${project.current_amount}</p>
            <p>Start Date: {project['start-date']}</p>
            <p>End Date: {project['end-date']}</p>
            <p>{project.comment}</p>
            <p>{project.categories}</p>
            <p>Category: {project.categories}</p>
            <button>Donate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
