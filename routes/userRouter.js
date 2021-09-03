const express=require("express");
const router=express.Router();
const auth=require("../middlewares/authvalidation")
const {login,register}=require("../controllers/usercontroller");
router.post('/register',register);
router.post('/login',login);

module.exports=router;

