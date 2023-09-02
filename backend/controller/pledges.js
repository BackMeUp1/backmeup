const {getAll ,add,putAmount} = require('../model/pledges');
const getPledges = (req, res) => {
  getAll((err,results)=>{
  err ? res.status(500).json(err) : res.status(200).json(results)
  })
  
  };
  
  const addPledges = (req, res) => {
    const PledgesData = req.body; 
    const userId = req.query.userId;
    
    add(PledgesData, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json(error); 
      } else {
        res.status(201).json(results);
      }
    });
  };


  const UpdateProjectPermission = (req, res) => {
    const {id}=req.params
    const updatedData = req.body;
    console.log(updatedData,"updated");
    putAmount(id, updatedData.updatedData, function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  };
  
  module.exports ={
    getPledges,
    addPledges
  }