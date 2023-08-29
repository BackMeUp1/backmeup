import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        
          
         <Route path= "/Home" element={<Home/>} />
          <Route path="projectList" element={<ProjectList />} />
          <Route path="*" element={<NoPage />} />
        
      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));

export default App
