import { useEffect } from "react"
import  React, {useState} from 'react'
import axios from "axios"
import "./SubmissionDonation.css"


export default function  SubmitDonation (props) {
  const{idprojects,current_amount}=props.updated
const [Amount,setAmount]= useState("")

useEffect(()=>{
  setAmount(current_amount)
  
  },[])


  const handelclick =() =>{
    axios.put(`http://localhost:4000/api/project/Amount/${idprojects}`, {
      current_amount:parseFloat(Amount),
    }).then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
    }

    return (
    <div>
      <h2>Donate to {props.updated.title}</h2>
      <p>{props.updated.description}</p>
      <p>Current Amount: ${props.updated.current_amount}</p>
      <label>
        New Amount (in dollars):
        <input
          type="number"
          
          onChange={(e)=>setAmount(e.target.value)}
          required
        />
      </label>
      <button onClick={()=>{
      
      handelclick()
  alert("updated succesfully")
  
  }
  
  }>Update Donation Amount</button>
     
    </div>
  );
};
