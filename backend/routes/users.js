const express = require("express");
const { getUsers, addUsers} = require("../controller/users");
const router = express.Router();

router.get("/get", getUsers);
router.post("/add", addUsers);

module.exports = router;