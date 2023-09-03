import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  IconButton,
  Collapse,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress, // Import LinearProgress component
} from "@mui/material";
import {
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  height: "100%",
  borderRadius: "10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  marginBottom: "20px",
};

const hoverStyle = {
  transform: "scale(1.05)",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const headlineStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
};

const linkStyle = {
  textDecoration: "none", 
  color: "inherit", 
  cursor: "pointer",
};
import './ProjectList.css';
const ProjectList = (props) => {
  const navigate = useNavigate();

  const { projects, setSelected ,filProjects,projected  } = props;
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleImageClick = (project) => {
    setSelected(project);
    navigate("/ProjectDetail");
  };

  const projectsToRender =
    filProjects && filProjects.length > 0 ? filProjects : projects;

  const toggleDescription = (index, expanded) => {
    const newExpandedDescriptions = [...expandedDescriptions];
    newExpandedDescriptions[index] = expanded;
    setExpandedDescriptions(newExpandedDescriptions);
  };

  const handleShare = (project) => {
    setShareDialogOpen(true);
  };

  return (
    <Paper style={containerStyle} elevation={0}>
      <Typography variant="h2" style={headlineStyle}>
        Projects Asking for Backings at This Date:
      </Typography>
      <Grid container spacing={3}>
        {projected.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={cardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style = { ...cardStyle, ...hoverStyle })
              }
              onMouseLeave={(e) => (e.currentTarget.style = cardStyle)}
            >
              <CardActionArea onClick={() => handleImageClick(project)}>
                <CardMedia
                  component="img"
                  alt={project.title}
                  height="250"
                  image={project.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    <span
                      style={linkStyle} 
                      onClick={() => handleImageClick(project)}
                    >
                      {project.title}
                    </span>
                  </Typography>
                  <Collapse
                    in={expandedDescriptions[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </Collapse>
                  {project.description.length > 100 && (
                    <IconButton
                      onClick={() =>
                        toggleDescription(index, !expandedDescriptions[index])
                      }
                      aria-expanded={expandedDescriptions[index]}
                      aria-label="show more"
                      style={{ marginTop: "8px" }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  )}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box flexGrow={1}>
                    <Typography variant="body2" color="text.secondary">
                      Goal: ${project.goal_amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current amount: ${project.current_amount}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(project.current_amount / project.goal_amount) * 100}
                      style={{ marginTop: "8px", height: "10px" }}
                    />
                  </Box>
                  <Box>
                    <IconButton
                      aria-label="share"
                      onClick={() => handleShare(project)}
                    >
                      <ShareIcon color="primary" />
                    </IconButton>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                 
                    navigate("/SubmitDonation", { state: { project } }   )
                    props.stalTwo(project) ;
                  
                  }}
                >
                  Donate
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        aria-labelledby="share-dialog-title"
      >
        <DialogTitle id="share-dialog-title">Share Project</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              
              onClick={() => {
                window.open("https://www.facebook.com", "_blank");
                setShareDialogOpen(false);
              }}
            >
              <ListItemIcon>
                <i className="fab fa-facebook"></i>
              </ListItemIcon>
              <ListItemText primary="Facebook" />
            </ListItem>
            <ListItem
              
              onClick={() => {
                window.open("https://www.twitter.com", "_blank");
                setShareDialogOpen(false);
              }}
            >
              <ListItemIcon>
                <i className="fab fa-twitter"></i>
              </ListItemIcon>
              <ListItemText primary="Twitter" />
            </ListItem>
            <ListItem
              
              onClick={() => {
                window.open("https://www.instagram.com", "_blank");
                setShareDialogOpen(false);
              }}
            >
              <ListItemIcon>
                <i className="fab fa-instagram"></i>
              </ListItemIcon>
              <ListItemText primary="Instagram" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProjectList;
