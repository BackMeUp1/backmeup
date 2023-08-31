import { useState } from "react";

const ProjectList = (props) => {
  const { projects, filProjects, onProjectSelect } = props; // Destructure props
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageClick = (project) => {
    setSelectedProject(project);
  };
useState
  // Use the appropriate projects array based on category selection
  const projectsToRender = filProjects.length > 0 ? filProjects : projects;

  return (
    <div className="list">
      <ul>
        {projectsToRender.map((project, index) => (
          <li key={index}>
            <img
              src={project.image}
              alt="image"
              onClick={() => onProjectSelect(project)}
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Goal: ${project.goal_amount}</p>
            <p>Current amount: ${project.current_amount}</p>
            <p>Start Date: {project['start-date']}</p>
            <p>End Date: {project['end-date']}</p>
            <p>{project.comment}</p>
            <p>Category: {project.categories}</p>
            <button>Donate</button>
          </li>
        ))}
      </ul>
      {selectedProject && <ProjectDetail project={selectedProject} />}
    </div>
  );
};

export default ProjectList;
