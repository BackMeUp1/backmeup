import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

function Demande(props ) {
 const location = useLocation();
 const {project }= location.state
console.log(project);
  const handleAccept = (projectId) => {

    // Make an API call to update 'is_approved' to 1 for the selected project
    axios
      .put(`http://localhost:4000/api/project/permission/${projectId}`, {
        is_approved: 1, // Set 'is_approved' to 1 to indicate approval
      })
      .then((response) => {
        // Handle success, you can update the UI or state to reflect the change
        console.log('Project approved:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error approving project:', error);
      });
  };

  const handleReject = (projectId) => {
    // Make an API call to update 'is_approved' to -1 or another value to indicate rejection
    axios
      .put(`http://localhost:4000/api/project/permission/${projectId}`, {
        is_approved: 0, // Set 'is_approved' to -1 to indicate rejection
      })
      .then((response) => {
        // Handle success, you can update the UI or state to reflect the change
        console.log('Project rejected:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error rejecting project:', error);
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
