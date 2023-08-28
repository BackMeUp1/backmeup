const Project = require('../model/projects.js'); 

module.exports = {
  createProject: (req, res) => {
    const projectData = req.body;
    Project.create(projectData, (err, insertedId) => {
      if (err) {
        console.error('Error creating project:', err);
        return res.status(500).json({ error: 'Error creating project' });
      }
      res.status(201).json({ message: 'Project created successfully', insertedId });
    });
  },

  getProjectById: (req, res) => {
    const projectId = req.params.id;
    Project.getById(projectId, (err, project) => {
      if (err) {
        console.error('Error fetching project:', err);
        return res.status(500).json({ error: 'Error fetching project' });
      }
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    });
  },

  updateProjectById: (req, res) => {
    const projectId = req.params.id;
    const updatedProjectData = req.body;
    Project.updateById(projectId, updatedProjectData, (err, success) => {
      if (err) {
        console.error('Error updating project:', err);
        return res.status(500).json({ error: 'Error updating project' });
      }
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ message: 'Project updated successfully' });
    });
  },

  deleteProjectById: (req, res) => {
    const projectId = req.params.id;
    Project.deleteById(projectId, (err, success) => {
      if (err) {
        console.error('Error deleting project:', err);
        return res.status(500).json({ error: 'Error deleting project' });
      }
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json({ message: 'Project deleted successfully' });
    });
  },
};