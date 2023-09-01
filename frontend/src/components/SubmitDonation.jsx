import React, { useState } from 'react';
import axios from 'axios';

const SubmitDonation = ({ project, userId, onClose }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Make an API call to send the donation data to the server
      const response = await axios.post('http://localhost:4000/api/pledges/add', {
        amount: parseFloat(amount),
        users_iduser: userId, // Include the user's ID
        projects_idprojects: project.id, // Include the project ID
      });

      // Check the response for success or handle errors here
      console.log('Donation submitted successfully:', response.data);

      // After successfully submitting the donation, you can close the component.
      onClose();
    } catch (error) {
      setError('An error occurred while processing your donation. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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
            placeholder="Enter donation amount"
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <button onClick={onClose} disabled={isLoading}>
        Cancel
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SubmitDonation;



