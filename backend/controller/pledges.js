const {getAll ,add} = require('../model/pledges');
const getPledges = (req, res) => {
  getAll((err,results)=>{
  err ? res.status(500).json(err) : res.status(200).json(results)
  })
  
  };
  
  const addPledges = (req, res) => {
    const PledgesData = req.body; 
    
    add(PledgesData, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json(error); 
      } else {
        res.status(201).json(results);
      }
    });
  };
  
  module.exports ={
    getPledges,
    addPledges
  }