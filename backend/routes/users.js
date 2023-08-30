const express = require("express");
const { signUp,signIn,getUsers ,RemoveUser } = require("../controller/users");
const router = express.Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
router.get ('/get',getUsers)
router.delete("/:id",RemoveUser);


module.exports = router;