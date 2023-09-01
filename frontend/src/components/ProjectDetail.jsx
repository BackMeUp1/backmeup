

import React from 'react';
import "./ProjectDetail.css"

const ProjectDetail = (props) => {
  return (
    <div className="project-detail">
      <img src={props.project.image} alt={props.project.title} className="project-image" />
      <div className="project-info">
        <h3 className="project-title">{props.project.title}</h3>
        <p className="project-description">{props.project.description}</p>
        <div className="project-funds">
          <p className="project-goal">Goal: ${props.project.goal_amount}</p>
          <p className="project-current">Current amount: ${props.project.current_amount}</p>
        </div>
        <div className="project-dates">
          <p className="project-start-date">Start Date: {props.project['start-date']}</p>
          <p className="project-end-date">End Date: {props.project['end-date']}</p>
        </div>
        <p className="project-comment">{props.project.comment}</p>
        <button className="project-donate-button">Donate</button>
      </div>
    </div>
  );
};

export default ProjectDetail;