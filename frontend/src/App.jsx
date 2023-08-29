
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar"
import SecondNavbar from "./components/SecondNavbar";

import Home from "./components/Home"


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
<Route path="/Home" element={<Home/>}/>
<Route path= "/" element ={<SecondNavbar/>}/>
    </Routes>
    </BrowserRouter>
  )}


  export default App