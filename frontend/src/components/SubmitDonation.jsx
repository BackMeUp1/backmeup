import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
const SubmitDonation = (props) => {
    const location=useLocation()
  const {project}= location.state
console.log(project);
const [current,setCurrent]=useState(Number(project.current_amount))
  const [amount, setAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iduser,setId]=useState(8)
  const [projectId,setProjectId]=useState(project.idprojects)
  
const addAmount=() => {
    console.log(amount);
    setCurrent(amount+current)
}
console.log(current,"this is current");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Make an API call to send the donation data to the server
      const response = await axios.post('http://localhost:4000/api/pledges/add', {
        amount: current,
        users_iduser:iduser,
        projects_idprojects:projectId,
      });

      // Check the response for success or handle errors here
      console.log('Donation submitted successfully:', response.data);

      // After successfully submitting the donation, you can close the component.
    } catch (error) {
      setError('An error occurred while processing your donation. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  console.log(typeof(amount));
console.log(amount);
  return (
    <div className="submit-donation-container">
      <h2>Submit Donation</h2>
      <p>Project: {project.title}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <button  disabled={isLoading}>
        Cancel
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SubmitDonation;




