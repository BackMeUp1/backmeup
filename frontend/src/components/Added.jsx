import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios"
import { useNavigate } from 'react-router';

const ModalComponent = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title,setTitle]= useState("");
  const [description,setDescription]= useState("");
  const [goal_amount,setGoal_amount]= useState("");
  const [startDate,setStartDate]= useState("");
  const [categories,setCategorie]= useState("");
  const [endDate,setEndDate]= useState("");
  const [comment,setComment]= useState("");
  const [iduser,setId]=useState(8);
  const navigate=useNavigate();
  const presetKey="khouloud";
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "khouloud"); 


    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dp4k4aemx/image/upload`,
        form
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = () => {
    Swal.fire({
      title: 'Project Submission',
      text: 'Your project will be reviewed by the admin. Please wait for 24 hours for admin approval.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:4000/api/project/add", {
          title: title,
          description: description,
          goal_amount: goal_amount,
          current_amount: 0,
          is_approved: 0,
          "start-date": startDate,
          "end-date": endDate,
          comment: comment,
          image: imageUrl,
          categories: categories,
          users_iduser: iduser
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        }).catch((err) => console.log(err));
      }
    });
  };

  const Handeltitle = (e)=>{
    setTitle(e.target.value);
  }

  const handleDescription =(e)=>{
    setDescription(e.target.value);
  }

  const handlGoal_amount =(e)=>{
    setGoal_amount(e.target.value);
  }

  const handlcategories =(e)=>{
    setCategorie(e.target.value);
  }

  const handlStartDate =(e)=>{
    setStartDate(e.target.value);
  }

  const handlEndDate =(e)=>{
    setEndDate(e.target.value);
  }

  const handlComment=(e)=>{
    setComment(e.target.value);
  }

  return (
    <div className="container">
      <div className="input">
        <label className="input__label">Project title</label>
        <input className="input__field" type="text" onChange={(e)=>setTitle(e.target.value)} />
        <p className="input__description">
          The title must contain a maximum of 32 characters
        </p>
      </div>
      <div className="input">
        <label className="input__label">Description</label>
        <textarea className="input__field input__field--textarea" onChange={(e)=>handleDescription(e)}></textarea>
        <p className="input__description">
          Give your project a good description so everyone knows what it's for
        </p>
      </div>
      <div className="input input--image">
        <label className="input__label">Image</label>
        <input className="input__field input__field--image" type="file" onChange={handleFile} />
        <button onClick={uploadImage}>add image</button>
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded" style={{maxWidth:"100%"}} />
        )}
      </div>
      <div className="input">
        <label className="input__label">Goal Amount</label>
        <input className="input__field" type="number" onChange={(e)=>handlGoal_amount (e)}/>
      </div>
      <div className="input">
        <label className="input__label">Start Date</label>
        <input className="input__field" type="date"  onChange={(e)=>handlStartDate(e)} />
      </div>
      <div className="input">
        <label className="input__label">End Date</label>
        <input className="input__field" type="date"  onChange={(e)=>handlEndDate(e)} />
      </div>
      <div className="input">
        <label className="input__label">Comments</label>
        <textarea className="input__field input__field--textarea"  onChange={(e)=>handlComment(e)}></textarea>
      </div>
      <div className="input">
        <label className="input__label"  onClick={(e)=>{setCategorie(e.target.value)}} >Category</label>
        <div className="category-button-group">
          <button
            className={`button category-button ${selectedCategory === 'movies' ? 'selected' : ''}`}
            onClick={() => setSelectedCategory('movies')}
          >
            Movies
          </button>
          <button
            className={`button category-button ${selectedCategory === 'games' ? 'selected' : ''}`}
            onClick={() => setSelectedCategory('games')}
          >
            Games
          </button>
          <button
            className={`button category-button ${selectedCategory === 'books' ? 'selected' : ''}`}
            onClick={() => setSelectedCategory('books')}
          >
            Books
          </button>
          <button
            className={`button category-button ${selectedCategory === 'tech' ? 'selected' : ''}`}
            onClick={() => setSelectedCategory('tech')}
          >
            Tech
          </button>
          <button
            className={`button category-button ${selectedCategory === 'designs' ? 'selected' : ''}`}
            onClick={() => setSelectedCategory('designs')}
          >
            Designs
          </button>
        </div>
      </div>
      <div className="input">
        <button className="button button--primary" onClick={()=>{
          handleAdd();
          navigate("/projects");
          props.setrefresh(!props.refresh);
        }}>
          Create project
        </button>
      </div>
    </div>
  );
};

export default ModalComponent;
