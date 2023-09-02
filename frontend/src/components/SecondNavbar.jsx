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
import SearchIcon from "@mui/icons-material/Search";

const pages = ["games", "movies", "books", "Tech", "Designs"];

function SecondNavbar({ onCategorySelect, search }) {
  const isAuthenticated = Cookies.get("token");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  const handleLogOut = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const handleAddProject = () => {
    navigate("/added");
  };

  // Update the search term state when the input value changes
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Trigger the search when the form is submitted
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    search(searchTerm); // Call the search function with the search term
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
            <Button
              key="All"
              onClick={() => onCategorySelect(null)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              All
            </Button>
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

          {/* Search input and button */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <form onSubmit={handleSearchSubmit}> {/* Attach the onSubmit event handler */}
              <InputBase
                placeholder="Search..."
                onChange={handleSearchInputChange}
                value={searchTerm} 
                sx={{ mr: 1, color: "white" }}
              />
              <Button
                type="submit"
                sx={{ color: "white", backgroundColor: "transparent" }}
              >
                <SearchIcon />
              </Button>
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
                  onClick={handleAddProject} // Update the onClick event handler
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
