import React from 'react';

 function Herosection(props) {
  
  const { projects } = props;
  // const mostFundedProject = projects.reduce((max, project) => {
  //   return project.current_amount > max.current_amount ? project : max;
  // }, projects[0]);
  const mostFundedProject = projects.length > 0
  ? projects.reduce((max, project) => {
      return project.current_amount > max.current_amount ? project : max;
    }, projects[0])
  : null;

  return (
    <div style={{ maxWidth: 345 }}>
      <div>
        <div>
          <span>R</span>
        </div>
        <div>
          <h2>{mostFundedProject.title}</h2>
          <p>Funding: ${mostFundedProject.current_amount}</p>
        </div>
      </div>
      <div>
        <img
          src={mostFundedProject.image}
          alt={mostFundedProject.title}
          style={{ height: '194px', width: '100%' }}
        />
      </div>
      <div>
        <p>{mostFundedProject.description}</p>
      </div>
    </div>
  );
}
export default Herosection;

