import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import './SubmissionDonation.css';

export default function SubmitDonation(props) {
  const { current_amount, updated, stalUpdated } = props;
  const [Amount, setAmount] = useState('');
  const { idprojects } = useParams(); // Get idprojects from route parameters

  useEffect(() => {
    setAmount('');
  }, [updated]);

  const handleUpdateAmount = () => {
    if (!idprojects) {
      alert('Invalid project ID');
      return;
    }
  
    // Parse the input value as a float
    const newDonation = parseFloat(Amount);
  
    // Check if the parsed value is a valid number
    if (!isNaN(newDonation)) {
      const updatedAmount = current_amount + newDonation;
  
      axios
        .put(`http://localhost:4000/api/project/Amount/${idprojects}`, {
          current_amount: updatedAmount,
        })
        .then((result) => {
          console.log(result);
          alert('Donation added successfully');
          setAmount('');
          stalUpdated({ ...updated, current_amount: updatedAmount });
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please enter a valid number for the donation amount.');
    }
  };
  

  return (
    <div>
      <h2>Donate to {updated.title}</h2>
      <p>{updated.description}</p>
      <p>Current Amount: ${updated.current_amount}</p>
      <label>
        New Amount (in dollars):
        <input
          type="number"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <button onClick={handleUpdateAmount} type="button">
        Update Donation Amount
      </button>
    </div>
  );
}
