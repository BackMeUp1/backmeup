const express = require('express');
const router = express.Router();
const  {addProject,getProject,UpdateProject,RemoveProject,getZero,UpdateProjectPermission} = require ("../controller/projects")


router.post('/add',addProject);
router.get('/get',getProject)
router.put('/:id',UpdateProject)
router.delete('/:id',RemoveProject)
router.get(`/getPermission`,getZero)
router.put(`/permission/:id`,UpdateProjectPermission)



module.exports = router;