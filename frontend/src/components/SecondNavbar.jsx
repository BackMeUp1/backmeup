import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import InputBase from "@mui/material/InputBase";

const pages = ["Games", "Movies", "Books", "Tech", "Designs"];

function SecondNavbar({ onCategorySelect, search }) {
  const isAuthenticated = Cookies.get("token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const handleLogOut = () => {
    Cookies.remove("token");
    window.location.reload();
    navigate("/login");
  };

  const handleAddProject = () => {
    navigate("/added");
  };


  
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    search(searchTerm); 
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Typography>

          <Button
            key="Discover"
            sx={{ my: 2, color: "white", display: "block" }}
            component={Link}
            to="/projects"
          >
            Discover
          </Button>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >

            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => onCategorySelect(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >

            <form onSubmit={handleSearchSubmit}> 
              <InputBase
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </form>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {!isAuthenticated ? (
              <Button
                key="LogIn"
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to="/login"
              >
                Log In
              </Button>
            ) : (
              <>
                <Button
                  key="Add Project"
                  sx={{ my: 2, color: "white", display: "block" }}
                  component={Link}
                  onClick={handleAddProject} 
                  to="/added"
                >
                  Add Project
                </Button>
                <Button
                  key="LogOut"
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default SecondNavbar;
