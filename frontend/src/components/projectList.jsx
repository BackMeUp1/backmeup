import React ,{useState,useEffect}from 'react';
import projects from './data.json';



const ProjectList = () => {

    const [menuView, setMenuView] = useState(false);
    
    const toggleMenu = () => {
        setMenuView(!menuView);
      };   
    
  
    return (
        

        
      <div>
        <span onClick={toggleMenu}>
            All categories
        </span>
        <ul>
          {projects.map((e, index) => (
            <li key={index}>
              <img src= {e.image} alt="image" />  
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <p>Goal: ${e.goal_amount}</p>
              <p> Current amount :${e.current_amount} </p> 
              <p>{e?.['start-date']}</p>
              <p>{e?.['end-date']}</p>
              <p>{e.comment}</p>
              <button> </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProjectList;