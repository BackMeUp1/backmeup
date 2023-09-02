import { useEffect } from "react"
import  React, {useState} from 'react'
import axios from "axios"


export default function SubmitDonation (props) {

const{_id,name,traits,affiliations,image,description}=props.updated
const [names,setNames]= useState("")
const [traites,setTraits]= useState("")
const [affiliation,setAffiliation]= useState("")
const [images,setImages]= useState("")
const [descriptions,setDescriptions]= useState("")

useEffect(()=>{
setNames(name)
setTraits(traits)
setAffiliation(affiliations)
setImages(image)
setDescriptions(description)
},[])

const handelclick =() =>{
axios.put(`http://localhost:5000/api/charachter/${_id}`,{
name:names,
traits:traites,
affiliations:affiliation,
image:images,
description:descriptions,
}).then((res)=>{
    console.log(res)
}).catch((err)=>{console.log(err)})
}

return (
    <div>
        <div>
           <input
        
        required
        id="outlined-required"
        label="name"
        defaultValue={name}
        onChange={(e)=>setNames(e.target.value)}
      />
      <input
      
      required
      id="outlined-required"
      label="traits"
      defaultValue={traits}
      onChange={(e)=>setTraits(e.target.value)}
    />

    <input
      
        required
        id="outlined-required"
        label="affiliation"
        defaultValue={affiliations}
        onChange={(e)=>setAffiliation(e.target.value)}
      />
    <input
      
      required
      id="outlined-required"
      label="image"
      defaultValue={image}
      onChange={(e)=>setImages(e.target.value)}
    />
    <input
      
      required
      id="outlined-required"
      label="description"
      defaultValue={description}
      onChange={(e)=>setDescriptions(e.target.value)}
    />
    </div>
    <button
    onClick={()=>{
      
        handelclick()
    alert("updated succesfully")
    
    }
    
    }
    >update</button>
 

    </div>
  )
}
