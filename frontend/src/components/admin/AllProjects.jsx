import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./AllProject.css"; 

const AllProject = (props) => {
  const [projects, setProjects] = useState([]);
  const [trigger,setTrigger]= useState(false)
  const [approved,setApproved]=useState([])
  const [showDemande, setShowDemande] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:4000/api/project/get')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [trigger]);


  const getPermission=()=>{
    axios.get("http://localhost:4000/api/project/getPermission")
    .then((res)=>{
      setProjects(res.data);
    })
    .catch((err)=>console.log(err))
  }

  const getPermissionApproved=()=>{
    axios.get("http://localhost:4000/api/project/permissionOne")
    .then((res)=>{
      setProjects(res.data);
    })
    .catch((err)=>console.log(err))
  }



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
      <div>
      <button type='button' onClick={getPermissionApproved} >approved</button>
      <button type='button' onClick={getPermission}>not approved</button>
      </div>
      <h2>All Projects</h2>
      {projects.map(project =>{ 
        console.log(project,"ALL");
        return (

        <div key={project.idprojects}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button onClick={() => {handleDelete(project.idprojects)}}>Delete</button>
          <button onClick={() => {navigate('/admin/Demande', { state: { project } }); // Navigate to "/demande" with project data
  }}
>
  demande
</button>
        </div>
      )})}
    </div>
  );
};

export default AllProject;