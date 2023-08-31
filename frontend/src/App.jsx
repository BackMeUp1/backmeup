import React, { useState ,useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SecondNavbar from './components/SecondNavbar';
import Home from './components/Home';
import ProjectList from "./components/projectList.jsx"
import ProjectDetail from './components/ProjectDetail';
import axios from 'axios';
import Footer from './components/Footer';
import SearchOne from './components/SearchOne';
import Login from './components/login';
import Dashboard from "./components/Dashboard.jsx";
import Cookies from 'js-cookie';

function App() {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [load,setLoad] =useState(true)
  useEffect(() => {

  const fetchUser = async () => {
    setLoad(true)
    try {
      const response = await fetch('http://localhost:4000/api/users/current', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData, 'this userData');
        setUser(userData); // Assuming setUser is a prop received from the parent component
      }
      setLoad(false)

    } catch (error) {
      setLoad(false)
      console.error('Error fetching user data:', error);
    }
  };
    fetchUser();
  }, []);

  const ProtectedRoute = ({ u, role, children }) => {
    console.log (!load);
    if (!load && (!u || u.role !== role)) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  const handleSearch = (str) => {
    setSearchQuery(str);
  };

  return (
    <BrowserRouter>
      <Navbar handleSearch={handleSearch} />
      <SecondNavbar />
      <ProjectList projects={projects} />
      <Routes>
        <Route path="/login" element={user ? user.role === "admin" ? <Navigate to="/dashboard" /> : <Navigate to="/home" /> : <Login />} />
        <Route path="/detail/:id" element={<ProjectDetail />} />
        <Route path="/search" element={<SearchOne str={searchQuery} />} />
        <Route path="/home" element={<ProtectedRoute u={user} role="user"><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute u={user} role="admin"><Dashboard /></ProtectedRoute>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;