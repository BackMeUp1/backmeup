import {useState} from "react";

import axios from "axios"
import React from "react"


const Add = (props) => {
  const [title,setTitle]= useState("")
  const [description,setDescription]= useState("")
  const [image,setImage]= useState("")
  const [goal_amount,setGoal_amount]= useState("")

  const [startDate,setStartDate]= useState("")
 
  const [categories,setCategorie]= useState("")
  const [endDate,setEndDate]= useState("")
 const [ comment,setComment]= useState("")

 const handladd = () => {
    
    Swal.fire({
      title: 'Project Submission',
      text: 'Your project will be reviewed by the admin. Please wait for 24 hours for admin approval.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios.post("http://localhost:4000/api/project/add", {
          title,
          description,
          goal_amount,
          current_amount,
          is_approved,
          startDate,
          endDate,
          comment,
          image,
          categories
        }).then((res) => {
          console.log(res.data);
          window.location.reload();
        }).catch((err) => console.log(err));
      }
    });
  };


  const Handeltitle = (e)=>{
    setTitle(e.target.value)
}
const handleImage =(e)=>{
  setImage(e.target.value)
}

const handleDescription =(e)=>{
    setDescription(e.target.value)
}

const handlGoal_amount =(e)=>{
    setGoal_amount(e.target.value)
}



const handlcategories =(e)=>{
    setCategorie(e.target.value)
  }

  const handlStartDate =(e)=>{
    setStartDate(e.target.value)
  }

  const handlEndDate =(e)=>{
    setEndDate(e.target.value)
  }

  const handlComment=(e)=>{
    setComment(e.target.value)
  }
  

  


  return (
    <div className="container">

    <div className="add-character-container">
      <h2 className="add-character-title">Add New Character</h2>
      <form className="add-character-form">
        <label className="add-character-label" htmlFor="name">
         Title:
        </label>
        <input className="add-character-input" type="text" id="name"  
        onChange={(e)=>Handeltitle(e)}/>

        <label className="add-character-label" htmlFor="traits">
          Description:
        </label>
        <input className="add-character-input" type="text" id="traits"
        onChange={(e)=>handleDescription(e)} />

        <label className="add-character-label" htmlFor="affiliations">
          Goal-Amount:
        </label>
        <input className="add-character-input" type="text" id="affiliations"
        onChange={(e)=>handlGoal_amount (e)} />

        <p>Current Amount</p>

        <label className="add-character-label" htmlFor="image">
          Category:
        </label>
        <input className="add-character-input" type="text" id="image"
        onChange={(e)=>handlcategories(e)} />

<label className="add-character-label" htmlFor="image">
          Start Date:
        </label>
        <input className="add-character-input" type="text" id="image"
        onChange={(e)=>handlStartDate(e)} />

        <label className="add-character-label" htmlFor="traits">
          End Date:
        </label>
         <input className="add-character-input" type="text" id="traits"
        onChange={(e)=>handlEndDate(e)} />


           <label className="add-character-label" htmlFor="traits">
          Image:
        </label>
         <input className="add-character-input" type="text" id="traits"
        onChange={(e)=>handleImage(e)} />

           <label className="add-character-label" htmlFor="traits">
          Comments:
          </label>
          <input className="add-character-input" type="text" id="traits"
          onChange={(e)=>handlComment(e)} />


        <button type="button" className="add-character-button" onClick={()=>{
          handladd ()
        } } >
          Add Project
        </button>
      </form>
    </div>
    </div>
  );
};

export default Add;
