const express = require("express");
const { signUp,signIn,getUsers } = require("../controller/users");
const router = express.Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
router.get ('/get',getUsers)

module.exports = router;