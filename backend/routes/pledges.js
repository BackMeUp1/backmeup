const express = require('express');
const pledgeController = require('../controller/pledges');

const router = express.Router();

router.post('/create', pledgeController.createPledge);
router.get('/getAll', pledgeController.getAllPledges);
router.put('/update/:pledgeId', pledgeController.updatePledgeAmount);
router.delete('/delete/:pledgeId', pledgeController.deletePledge);

module.exports = router;