const express = require('express');
const router = express.Router();
const projectController = require('../controller/projects.js'); // Update the path as needed

router.post('/addone', projectController.createProject);
router.get('/:id', projectController.getAllProjects);
router.put('/:id', projectController.updateProjectById);
router.delete('/:id', projectController.deleteProjectById);

module.exports = router;