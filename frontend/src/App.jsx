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
import Dashboard from "./components/admin/Dashboard.jsx";
import AllProjects from "./components/admin/AllProjects.jsx"
import Demande from "./components/admin/Demande";
import Cookies from "js-cookie";
import Login from "./components/login.jsx";
import Added from "./components/Added";
import { filledInputClasses } from "@mui/material";

// import Herosection from './components/Herosection';
import ContactUs from "./components/ContactUs";

function App() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [selected, setSelected] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [load, setLoad] = useState(true);
  const [adino,setAdino]=useState({})

  const ading=()=>{
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
      categories
  })
   }

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/project/get")
      .then((response) => {
        setProjects(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);



  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery("");
    setSelected(null);

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

const projectList =(query)=>{
if (!query){
  setrefresh(!refresh)
}
else setProjects(projects.filter((e) => {
  console.log("el", e);
  return (
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.categories.toLowerCase().includes(query.toLowerCase())
  );}))
}

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
const reload =()=>{
  setrefresh(!refresh)
}
  return (
    <BrowserRouter>
      <Navbar reload={reload} handleSearch={handleSearch} projects={projects}  projectlist={projectList}/>
      <SecondNavbar onCategorySelect={handleCategorySelect} />

      <Routes>
        <Route

          path="/projects"
          element={
            <ProjectList
              projects={projects}
              setSelected={setSelected}
              filProjects={filteredProjects}
            /> }  />

        <Route
          path="/added"
          element={
            <ProtectedRoute role="user">
              <Added  ading={ading}  refresh={refresh} setrefresh={setrefresh}/>
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
                <Navigate to="/" /> )
            ) : (
              <Login />)
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
          path="/admin/Dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard projects={projects} />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/All-project"  element={ <ProtectedRoute role="admin">
              <AllProjects projects={projects} />
            </ProtectedRoute>}/>

            <Route path="/admin/Demande"  element={ <ProtectedRoute role="admin">
              <Demande projects={projects} />
            </ProtectedRoute>}/>
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
