import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';

import { useLocation } from 'react-router';
import Swal from 'sweetalert2';


function Demande(props ) {
  const navigate = useNavigate()
 const location = useLocation();
 const {project , trigger,setTrigger}= location.state
console.log(project);
  const handleAccept = (projectId) => {
    console.log(projectId,"id")
    // Make an API call to update 'is_approved' to 1 for the selected project
    axios
      .put(`http://localhost:4000/api/project/permission/${projectId}`, {
        updatedData: 1, // Set 'is_approved' to 1 to indicate approval
      })
      .then((response) => {
        // Handle success, you can update the UI or state to reflect the change
        console.log('Project approved:', response.data);
        Swal.fire({
          title: 'Project Approved',
          text: 'The project has been approved.',
          icon: 'success',
          confirmButtonText: 'OK'
          

        })
        navigate("/admin/All-project")
      })
      .catch((error) => {
        // Handle error
        console.error('Error approving project:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while approving the project.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleReject = (projectId) => {
    
    console.log(projectId,"id");
    // Make an API call to update 'is_approved' to -1 or another value to indicate rejection
    axios
      .put(`http://localhost:4000/api/project/permission/${projectId}`, {
        updatedData: 0, // Set 'is_approved' to -1 to indicate rejection
      })
      .then((response) => {
        // Handle success, you can update the UI or state to reflect the change
        console.log('Project rejected:', response.data);
        Swal.fire({
          title: 'Project Rejected',
          text: 'The project has been rejected.',
          icon: 'error',
          confirmButtonText: 'OK',
          
        });
        navigate("/admin/All-project")
      })
      .catch((error) => {
        // Handle error
        console.error('Error rejecting project:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while rejecting the project.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div>
      <h2>Project Requests</h2>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => handleAccept(project.idprojects)}>I Accept</button>
            <button onClick={() => handleReject(project.idprojects)}>I Reject</button>
    </div>
  );
}

export default Demande;
