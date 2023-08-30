

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectDetail = (props) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/detail/${project.id}`); // Assuming each project has a unique ID
  };

  return (
    <div>
      <img src={props.project.image} alt="image" onClick={handleImageClick} />
      <h3>{props.project.title}</h3>
      <p>{props.project.description}</p>
      <p>Goal: ${props.project.goal_amount}</p>
      <p>Current amount: ${props.project.current_amount}</p>
      <p>Start Date: {props.project['start-date']}</p>
      <p>End Date: {props.project['end-date']}</p>
      <p>{props.project.comment}</p>
      <button>Donate</button>
    </div>
  );
};

export default ProjectDetail;