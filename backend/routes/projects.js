const express = require('express');
const router = express.Router();
const  {addProject,getProject,UpdateProject,RemoveProject} = require ("../controller/projects")


router.post('/add',addProject);
router.get('/get',getProject)
router.put('/:id',UpdateProject)
router.delete('/:id',RemoveProject)


module.exports = router;