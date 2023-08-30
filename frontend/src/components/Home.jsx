import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Home() {
  const sectionStyle = {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    marginTop: "50px",
    fontSize: "20px",
    height: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const heroSectionStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "50px 0",
    textAlign: "center",
  };

  const heroImageStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "50%",
  };

  const projectHighlightStyle = {
    marginBottom: "110px",
    fontSize: "24px",
    fontWeight: "bold",
  };

  const otherProjectsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  };

  const otherProjectItemStyle = {
    marginTop: "5px",
    fontSize: "18px",
    marginBottom:"1px"
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper elevation={0} style={sectionStyle}>
          Section 1
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={0} style={sectionStyle}>
          Section 2
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={0} style={sectionStyle}>
          Section 3
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} style={heroSectionStyle}>
          <img
            src="path-to-your-image.jpg"
            alt="Project Image"
            style={heroImageStyle}
          />
          <Typography variant="body1" style={projectHighlightStyle}>
            Your Kickstarter project highlight goes here.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={0} style={{ ...heroSectionStyle, ...otherProjectsStyle }}>
          <Typography variant="h5">Other Projects</Typography>
          <div style={otherProjectItemStyle}>
            <p>Other Project 1</p>
          </div>
          <div style={otherProjectItemStyle}>
            <p>Other Project 2</p>
          </div>
          <div style={otherProjectItemStyle}>
            <p>Other Project 3</p>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

