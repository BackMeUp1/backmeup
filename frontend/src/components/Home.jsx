import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

export default function Home({ projects }) {
  const containerStyle = {
    marginTop: "16px",
  };

  const paperStyle = {
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const statStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  };

  const featuredProjectStyle = {
    marginTop: "16px",
  };

  const otherProjectsStyle = {
    marginTop: "16px",
    maxHeight: "400px",
    overflowY: "scroll",
  };

  const totalProjects = projects.length;
  const totalAmountCollected = projects.reduce(
    (total, project) => total + parseFloat(project.current_amount),
    0
  );
  const totalBackers = projects.reduce(
    (total, project) => total + project.backers,
    0
  );

  const featuredProject = projects.reduce(
    (maxProject, project) =>
      parseFloat(project.current_amount) > parseFloat(maxProject.current_amount)
        ? project
        : maxProject
  );

  return (
    <Container style={containerStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ ...paperStyle, ...statStyle }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="h6">Total Projects</Typography>
                <Typography variant="body1">{totalProjects}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">Total Amount Collected</Typography>
                <Typography variant="body1">
                  ${totalAmountCollected.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6">Total Backers</Typography>
                <Typography variant="body1">{totalBackers}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper style={{ ...paperStyle, ...featuredProjectStyle }}>
            <img
              src={featuredProject.image}
              alt="Featured Project"
              width="100%"
            />
            <Typography variant="h4">Featured Project</Typography>
            <Typography variant="body1">{featuredProject.title}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper style={{ ...paperStyle, ...otherProjectsStyle }}>
            <Typography variant="h4">Other Projects</Typography>
            {projects.map((project, index) => (
              <div key={index}>
                <Typography variant="h5">{project.title}</Typography>
                <Typography variant="body1">{project.description}</Typography>
                <Typography variant="body1">
                  ${project.current_amount}
                </Typography>
                <img src={project.image} alt="" width="100%" />
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
