import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SecondNavbar from "./components/SecondNavbar";
import Home from "./components/Home";
import ProjectList from "./components/projectList.jsx";
import ProjectDetail from "./components/ProjectDetail";
import axios from "axios";
import Footer from "./components/Footer";
import SearchOne from "./components/SearchOne";
import Dashboard from "./components/Dashboard.jsx";
import Cookies from "js-cookie";
import Login from "./components/login.jsx";
import Added from "./components/Added";
// import Herosection from './components/Herosection';

function App() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [selected, setSelected] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/project/get")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery("");
    setSelected(null); // Change this line to setSelected(null);

    const newFilteredProjects = category
      ? projects.filter((project) => project.categories === category)
      : projects;

    setFilteredProjects(newFilteredProjects);
  };

  const isAuthenticated = localStorage.getItem("token") == !true;

  useEffect(() => {
    const fetchUser = async () => {
      setLoad(true);
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/current",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData, "this userData");
          setUser(userData);
        }
        setLoad(false);
      } catch (error) {
        setLoad(false);
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const ProtectedRoute = ({ role, children }) => {
    console.log(!load);
    if (!load) {
      if (role === "admin" && user?.role === "admin") {
        return children;
      } else if (role === "user" && user?.role === "user") {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    }
    return null;
  };

  const handleSearch = (str) => {
    setSearchQuery(str);
  };

  return (
    <BrowserRouter>
      <Navbar handleSearch={handleSearch} />
      <SecondNavbar onCategorySelect={handleCategorySelect} />

      <Routes>
        <Route
          path="/projects"
          element={
            <ProjectList
              projects={projects}
              setSelected={setSelected}
              filProjects={filteredProjects}
            />
          }
        />
        <Route
          path="/added"
          element={
            <ProtectedRoute role="user">
              <Added />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={
            <>
              <ProtectedRoute role="user">
                <Home projects={projects}/>
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/ProjectDetail"
          element={<ProjectDetail project={selected} />}
        />
        <Route path="/search" element={<SearchOne str={searchQuery} />} />
        <Route
          path="/x"
          element={
            <ProtectedRoute role="user">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
