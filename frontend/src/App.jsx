import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList'
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        
{/*           
         <Route path= "/Home" element={<Home/>} /> */}
          <Route path="/" element={<ProjectList />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        
      </Routes>
    </Router>
  )
}


export default App
