const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController'); // Update the path as needed

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProjectById);
router.delete('/:id', projectController.deleteProjectById);

module.exports = router;