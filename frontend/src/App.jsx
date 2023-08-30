import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SecondNavbar from "./components/SecondNavbar";
import Home from "./components/Home";
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SecondNavbar />
      
      <Routes>
        <Route path="/Home" element={<Home />}  />
      </Routes>
      
      {/* Include the Footer component */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

