import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const StyledModal = styled(Paper)({
  width: '100%',
  maxWidth: 600,
  padding: '16px',
});

const StyledTitle = styled('h2')({
  fontSize: 24,
  marginBottom: '16px',
});

const StyledInput = styled(TextField)({
  marginBottom: '16px',
});

const StyledImageInput = styled('input')({
  display: 'none',
});

const StyledImagePreview = styled('img')({
  maxWidth: '100%',
  marginBottom: '16px',
});

const StyledButtonGroup = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  '& button': {
    marginRight: '8px',
  },
});

const ModalComponent = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
          title,
          description,
          goal_amount: goalAmount,
          current_amount: 0,
          is_approved: 0,
          "start-date": startDate,
          "end-date": endDate,
          comment,
          image: imageUrl,
          categories: selectedCategory,
          users_iduser: 8,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/projects");
          props.setRefresh(!props.refresh);
        })
        .catch((err) => console.log(err));
      }
    });
  };

  return (
    <StyledContainer>
      <StyledModal elevation={3}>
        <StyledTitle>New Project</StyledTitle>
        <StyledInput
          label="Project Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaAutosize
          className={StyledInput}
          rowsMin={4}
          placeholder="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {imageUrl && (
          <StyledImagePreview
            src={imageUrl}
            alt="Uploaded"
          />
        )}
        <StyledImageInput
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFile}
        />
        <label htmlFor="image">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Add Image
          </Button>
        </label>
        <StyledInput
          label="Goal Amount"
          type="number"
          fullWidth
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
        />
        <StyledInput
          label="Start Date"
          type="date"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <StyledInput
          label="End Date"
          type="date"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextareaAutosize
          className={StyledInput}
          rowsMin={4}
          placeholder="Comments"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <StyledButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
          >
            Create Project
          </Button>
        </StyledButtonGroup>
      </StyledModal>
    </StyledContainer>
  );
};

export default ModalComponent;
