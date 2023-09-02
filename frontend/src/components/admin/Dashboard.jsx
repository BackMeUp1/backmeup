import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import Cookies from "js-cookie";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  ExitToApp as LogoutIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

const AdminDashboard = (props) => {
  const { projects, siteVisitsData } = props;
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    if (triggerReload) {
      // Page reload logic
      window.location.reload();
    }
  }, [triggerReload]);

  const handleLogout = () => {
    Cookies.remove("token");
    setTriggerReload(true);
  };

  const totalProjects = projects.length;
  const totalAmountCollected = projects.reduce(
    (total, project) => total + parseFloat(project.current_amount || 0),
    0
  );
  const totalBackers = projects.reduce(
    (total, project) => total + (project.backers || 0),
    0
  );

  const chartData = [
    { name: "Project 1", clicks: 30 },
    { name: "Project 2", clicks: 25 },
    { name: "Project 3", clicks: 40 },
    { name: "Project 4", clicks: 43 },
    { name: "Project 5", clicks: 65 },
  ];
  const siteVisitsChartData = [
    { date: "2023-08-01", visits: 100 },
    { date: "2023-08-02", visits: 150 },
    { date: "2023-08-03", visits: 120 },
    { date: "2023-08-03", visits: 105 },
    { date: "2023-08-03", visits: 165 },
  ];

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <List>
          <ListItem button component={Link} to="/admin/All-project">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="All Projects" />
          </ListItem>
          <ListItem button component={Link} to="/admin/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
        <Divider />
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="content">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={`Total Projects: ${totalProjects}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Total Amount Collected: $${totalAmountCollected.toFixed(
                    2
                  )}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={`Total Backers: ${totalBackers}`} />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <div className="charts-container">
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Clicks per Project
              </Typography>
              <BarChart width={400} height={300} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>

          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Site Visits
              </Typography>
              <LineChart width={400} height={300} data={siteVisitsChartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visits" stroke="#82ca9d" />
              </LineChart>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
