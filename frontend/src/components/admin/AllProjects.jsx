import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllProject.css";
import AdminNavbar from "./adminNavbar";
import {
  Button,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";

const AllProject = (props) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/project/get")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [trigger]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/project/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== id)
          );
          setTrigger(!trigger);
        }
      })
      .catch((error) => console.log(error));
  };

  const getPermission = () => {
    axios
      .get("http://localhost:4000/api/project/getPermission")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  };

  const permissionOne = () => {
    axios
      .get("http://localhost:4000/api/project/permissionOne")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  };

  const calculateProgress = (project) => {
    const percentage =
      (parseFloat(project.current_amount) / parseFloat(project.goal_amount)) *
      100;
    return Math.min(100, Math.max(0, percentage));
  };

  return (
    <div className="centered-container">
      <AdminNavbar search={props.search} />
      <div className="button-container">
        <Button variant="contained" onClick={getPermission}>
          Not Approved
        </Button>
        <Button variant="contained" onClick={permissionOne}>
          Approved
        </Button>
      </div>
      <Typography variant="h4" gutterBottom>
        All Projects
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.idprojects}>
              <Card className="project-card">
                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(project)}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Goal Amount: ${project.goal_amount}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleDelete(project.idprojects);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate("/admin/Demande", {
                        state: { project },
                      });
                    }}
                  >
                    Demande
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AllProject;
