const {add ,getAll,putProject,remove,putAmount,getPermission,putProjectPermission, getPermissionApproved} = require("../model/projects")
const addProject = (req, res) => {
  const ProjectData = req.body; 
  
  add(ProjectData, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json(error); 
    } else {
      res.status(201).json(results); 
    }
  });
};

const getZero = (req, res) => {
  getPermission((err,results)=>{
  err ? res.status(500).json(err) : res.status(200).json(results)
  })
  };

  const getOne = (req, res) => {
    getPermissionApproved((err,results)=>{
    err ? res.status(500).json(err) : res.status(200).json(results)
    })
    }; 


const getProject = (req, res) => {
  getAll((err,results)=>{
  err ? res.status(500).json(err) : res.status(200).json(results)
  })
  };

  const UpdateProject = (req, res) => {
    const {id}=req.params
    const updatedData = req.body;
    putProject(id, updatedData, function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  };

  const UpdateProjectPermission = (req, res) => {
    const {id}=req.params
    const updatedData = req.body;
    console.log(updatedData,"updated");
    putProjectPermission(id, updatedData.updatedData, function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  };


  const UpdateAmount = (req, res) => {
    const {id}=req.params
    const updatedData = req.body;
    console.log(updatedData,"updated");
    putAmount(id, updatedData.updatedData, function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  };

  const RemoveProject = (req, res) => {
    const id = req.params.id;
  
    remove(id, function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  };

module.exports ={
  addProject,
  getProject,
  UpdateProject,
  RemoveProject,
  getZero,
  UpdateProjectPermission,
  getOne,
  UpdateAmount
}