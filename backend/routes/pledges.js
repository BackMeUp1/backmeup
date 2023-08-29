const express = require('express');
const {getPledges, addPledges} = require('../controller/pledges');
const router = express.Router();

router.get('/get',getPledges);
router.post('/add',addPledges);

module.exports = router;