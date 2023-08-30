// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProjectDetail = ({ project }) => {

//     const navigate = useNavigate();
//     const handleImageClick = () => {
//         navigate('/detail');
//     }

//   return (
//     <div>
//       <img src={project.image} alt="image" />
//       <h3>{project.title}</h3>
//       <p>{project.description}</p>
//       {/* ... other project details */}
//       <button>Donate</button>
//     </div>
//   );
// };

// export default ProjectDetail;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectDetail = ({ project }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/detail/${project.id}`); // Assuming each project has a unique ID
  };

  return (
    <div>
      <img src={project.image} alt="image" onClick={handleImageClick} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p>Goal: ${project.goal_amount}</p>
      <p>Current amount: ${project.current_amount}</p>
      <p>Start Date: {project['start-date']}</p>
      <p>End Date: {project['end-date']}</p>
      <p>{project.comment}</p>
      <button>Donate</button>
    </div>
  );
};

export default ProjectDetail;