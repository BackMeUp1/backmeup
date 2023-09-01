import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./AllProject.css"; 

const AllProject = (props) => {
  const [projects, setProjects] = useState([]);
  const [trigger,setTrigger]= useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/api/project/get')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [trigger]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/project/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
          setTrigger(!trigger)
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>All Projects</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <button onClick={() => {handleDelete(project.idprojects)}}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AllProject;