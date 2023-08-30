
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/Navbar"
import SecondNavbar from "./components/SecondNavbar";
import data from './components/data.json';

import Home from "./components/Home"
import SearchOne from "./components/SearchOne";



function App() {
  const [searchQuery, setSearchQuery] = useState('');


  const stalSearch =(str) => {
    setSearchQuery(str);

  };
  return (
    <BrowserRouter>
      <Navbar data={data} stal={stalSearch }/>
      <Routes>
        <Route path="/Home" element={<Home data={data} />} />
        <Route path="/search" element={<SearchOne str={searchQuery}  data={data}/>} />
        <Route path="/" element={<SecondNavbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
