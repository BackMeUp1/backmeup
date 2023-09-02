import React from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";

const ProjectDetail = (props) => {
  const { project } = props;

  // Calculate the progress percentage
  const progress = (project.current_amount / project.goal_amount) * 100;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
            style={{ maxWidth: "400px", maxHeight: "400px", marginRight: "16px" }}
          />
          <div>
            <Typography variant="h4" component="h3" gutterBottom>
              {project.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {project.description}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              mt={2}
              sx={{ flexDirection: "column" }}
            >
              <CircularProgress
                variant="determinate"
                value={progress}
                size={160}
                thickness={4}
                sx={{
                  color: progress >= 100 ? "success.main" : "primary.main",
                  marginRight: "16px",
                }}
              />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                ml={2}
              >
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Funded: {progress.toFixed(2)}%
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  ${project.current_amount} raised of ${project.goal_amount}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Goal: ${project.goal_amount}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Current amount: ${project.current_amount}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Start Date: {project["start-date"]}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  End Date: {project["end-date"]}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {project.comment}
                </Typography>
                <Button variant="contained" color="primary">
                  Donate
                </Button>
              </Box>
            </Box>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProjectDetail;
