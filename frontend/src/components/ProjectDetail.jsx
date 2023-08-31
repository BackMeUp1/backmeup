

import React from 'react';

const ProjectDetail = (props) => {
  


  return (
    <div>
      {console.log(props,"hi")}
      <img src={props.project.image}  />
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