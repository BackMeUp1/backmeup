import React from 'react';
import Navbar from './Navbar';

function SearchOne(props) {
  const { data, str } = props;

  const filteredProjects = data.filter(project => {
    return (
      project.title.toLowerCase().includes(str.toLowerCase()) ||
      project.categories.some(categories =>
        categories.toLowerCase().includes(str.toLowerCase())
      )
    );
  });

  return (
    <div>
      {filteredProjects.map(project => (
        <div key={project.title}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>{project.goal_amount}</p>
          <p>{project.current_amount}</p>
          <p>{project.is_approved}</p>
          <p>{project.start-date}</p>
          <p>{project.end-date}</p>
          <p>{project.comment}</p>
          <p>{project.image}</p>
          
        </div>
      ))}
    </div>
  );
}

export default SearchOne;

