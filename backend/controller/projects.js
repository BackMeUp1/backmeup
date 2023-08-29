const {add ,getAll,putProject,remove} = require("../model/projects")
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
  const RemoveProject = (req, res) => {
    const id = req.params.id;
  
    remove(id, function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  };
// module.exports = {
//   createProject: (req, res) => {
//     const projectData = req.body;
//     Project.create(projectData, (err, insertedId) => {
//       if (err) {
//         console.error('Error creating project:', err);
//         return res.status(500).json({ error: 'Error creating project' });
//       }
//       res.status(201).json({ message: 'Project created successfully', insertedId });
//     });
//   },

//   getAllProjects: (req, res) => {
//     Project.getAll((err, projects) => {
//       if (err) {
//         console.error('Error fetching projects:', err);
//         return res.status(500).json({ error: 'Error fetching projects' });
//       }
//       res.json(projects);
//     });
//   },

//   updateProjectById: (req, res) => {
//     const projectId = req.params.id;
//     const updatedProjectData = req.body;
//     Project.updateById(projectId, updatedProjectData, (err, success) => {
//       if (err) {
//         console.error('Error updating project:', err);
//         return res.status(500).json({ error: 'Error updating project' });
//       }
//       if (!success) {
//         return res.status(404).json({ error: 'Project not found' });
//       }
//       res.json({ message: 'Project updated successfully' });
//     });
//   },

//   deleteProjectById: (req, res) => {
//     const projectId = req.params.id;
//     Project.deleteById(projectId, (err, success) => {
//       if (err) {
//         console.error('Error deleting project:', err);
//         return res.status(500).json({ error: 'Error deleting project' });
//       }
//       if (!success) {
//         return res.status(404).json({ error: 'Project not found' });
//       }
//       res.json({ message: 'Project deleted successfully' });
//     });
//   },
// };
module.exports ={
  addProject,
  getProject,
  UpdateProject,
  RemoveProject
}