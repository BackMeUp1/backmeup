
import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css'
import { useNavigate } from 'react-router-dom'

const ProjectList = (props) => {
  const navigate = useNavigate();
  const { projects, setSelected } = props;
console.log(props);
  const handleImageClick = (project) => {
    setSelected(project);
    console.log(project);
  };
  

  return (
    <div className="list">
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
           
              <img
                src={project.image}
                alt="image"
                onClick={() => {
                  setSelected(project);
                  navigate('/ProjetDetail')
                }}
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
    </div>
  );
};

export default ProjectList;