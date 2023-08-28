const express = require('express');
const pledgeController = require('../controller/pledges');

const router = express.Router();

router.post('/create', pledgeController.createPledge);
router.get('/getAll', pledgeController.getAllPledges);

module.exports = router;