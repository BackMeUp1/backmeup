import React from "react";
import "./Home.css"; // Import the separate CSS file

export default function Home({ projects }) {
  const totalProjects = projects.length;
  const totalAmountCollected = projects.reduce(
    (total, project) => total + parseFloat(project.current_amount),
    0
  );
  const totalBackers = projects.reduce(
    (total, project) => total + project.backers,
    0
  );

  const featuredProject = projects.reduce((maxProject, project) =>
    parseFloat(project.current_amount) > parseFloat(maxProject.current_amount) ? project : maxProject
  );

  const someProjects = projects.slice(0, 3); // You can adjust the number as needed

  return (
    <div className="container">
      <div className="stats-container">
        <h4>Statistics</h4>
        <div className="stat">
          <h6>Total Projects</h6>
          <p>{totalProjects}</p>
        </div>
        <div className="stat">
          <h6>Total Amount Collected</h6>
          <p>${totalAmountCollected.toFixed(2)}</p>
        </div>
        <div className="stat">
          <h6>Total Backers</h6>
          <p>{totalBackers}</p>
        </div>
      </div>
      <div className="project-highlight">
        <img
          src={featuredProject.image}
          alt="Featured Project"
        />
        <h4>Featured Project</h4>
        <p>{featuredProject.title}</p>
      </div>
      <div className="other-projects">
        <h4>Other Projects</h4>
        {someProjects.map((project, index) => (
          <div className="other-project-item" key={index}>
            <h5>{project.title}</h5>
            <p>{project.description}</p>
            <p>${project.current_amount}</p>
            <img src={project.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
