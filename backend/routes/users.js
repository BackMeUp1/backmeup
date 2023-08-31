const express = require("express");
const { signUp, signIn, getUsers, RemoveUser,getuser } = require("../controller/users");
const { authenticateToken } = require("../Middleware.js"); 
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/get', getUsers);
router.delete("/:id", authenticateToken, RemoveUser);
router.get("/current",authenticateToken,getuser)
module.exports = router;
