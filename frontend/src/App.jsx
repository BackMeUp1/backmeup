import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SecondNavbar from "./components/SecondNavbar";
import Home from "./components/Home";
import ProjectList from "./components/projectList.jsx";
import ProjectDetail from "./components/ProjectDetail";
import axios from "axios";
import Footer from "./components/Footer";
import Dashboard from "./components/admin/Dashboard.jsx";
import AllProjects from "./components/admin/AllProjects.jsx";
import Demande from "./components/admin/Demande";
import UserList from "./components/admin/userList.jsx";
import Cookies from "js-cookie";
import Login from "./components/login.jsx";
import Added from "./components/Added";
import { filledInputClasses } from "@mui/material";

import ContactUs from "./components/ContactUs";
import SubmitDonation from "./components/SubmitDonation";

function App() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [selected, setSelected] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [load, setLoad] = useState(true);
  const [adino, setAdino] = useState({});
  const [trigger,setTrigger] = useState(false)
  
  const ading = () => {
    setAdino({
      title,
      description,
      goal_amount,
      current_amount,
      is_approved,
      startDate,
      endDate,
      comment,
      image,
      categories,
    });
  };

  const search = (searchTerm) => {
      if (searchTerm === '') {
        return setTrigger(!trigger)
      }
      const filteredData = projects.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProjects(filteredData);
    };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/project/permissionOne")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [trigger]);

  const handleProjectSelect = (project) => {
    setSelected(project);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery("");
    setSelected(null);

    const newFilteredProjects = category
      ? projects.filter((project) => project.categories === category)
      : projects;

    setFilteredProjects(newFilteredProjects);
  };

  const isAuthenticated = Cookies.get("token");

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
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const projectList = (query) => {
    if (!query) {
      setrefresh(!refresh);
    } else
      setProjects(
        projects.filter((e) => {
          console.log("el", e);
          return (
            e.title.toLowerCase().includes(query.toLowerCase()) ||
            e.categories.toLowerCase().includes(query.toLowerCase())
          );
        })
      );
  };

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
  const reload = () => {
    setrefresh(!refresh);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/projects"
          element={
            <ProtectedRoute role="user">
              <SecondNavbar projectList={projectList} search={search} onCategorySelect={handleCategorySelect} />
              <ProjectList
                projects={projects}
                setSelected={setSelected}
                filProjects={filteredProjects}
                projected={projects}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/added"
          element={
            <ProtectedRoute role="user">
              <SecondNavbar projectList={projectList} search={search} onCategorySelect={handleCategorySelect} />
              <Added ading={ading} refresh={refresh} setrefresh={setrefresh} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user?.role === "admin" ? (
                <Navigate to="/admin/Dashboard" />
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
              <SecondNavbar projectList={projectList} search={search} onCategorySelect={handleCategorySelect} />
                <Home projects={projects} />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/ProjectDetail"
          element={
            <>
              <SecondNavbar projectList={projectList} search={search} onCategorySelect={handleCategorySelect} />
              <ProjectDetail project={selected} />
            </>
          }
        />
        <Route
          path="/admin/Dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard projects={projects} />
            </ProtectedRoute>
          }
        />
        <Route path="/SubmitDonation" element={<SubmitDonation />} />

        <Route
          path="/admin/All-project"
          element={
            <ProtectedRoute role="admin">
              <SecondNavbar projectList={projectList} search={search} onCategorySelect={handleCategorySelect} />
              <AllProjects projects={projects} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/Demande"
          element={
            <ProtectedRoute role="admin">
              <Demande projects={projects} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
