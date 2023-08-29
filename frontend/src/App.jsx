
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar"
import SecondNavbar from "./components/SecondNavbar";

import Home from "./components/client/Home"


function App() {
  return (
    <BrowserRouter>
    <SecondNavbar/>
    <Routes>
<Route path="/Home" element={<Home/>}/>
<Route path= "/" element ={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  )}

  export default Home