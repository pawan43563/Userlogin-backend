// routes/auth.routes.js


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User} = require("../models/userModel");
const sendResponse=require("../utils/sendResponse")
const uniqid=require("uniqid")




// Sign-up
const register=async (req,res)=>{
    try{
        let userid=uniqid()
        const user = new User({
            userId:userid,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword:req.body.confirmPassword,
        });
        const response=await user.save()
        return sendResponse({
            res,
            statusCode: 200,
            message: "Registered Successfully",
            data: response
        });
    }catch(error){
        return sendResponse({
            res,
            statusCode: 400,
            message: "Error while registration",
            error:error 
        });
    }

}





const login=async(req,res)=>{
    try{
        let getuser=await (await User.findOne({email:req.body.email}))
        if(!getuser){
            return sendResponse({
                res,
                statusCode: 404,
                message: "Email Not Found",
                error:"Email does not exist in our system"
            });
        }
        let response=await getuser.comparePassword(req.body.password);
        if(!response){
            return sendResponse({
                res,
                statusCode: 401,
                message: "Wrong password",
                error:"Make sure you have entered correct password" 
            });
        }
        let jwtToken = await jwt.sign({
            email: getuser.email,
            userId: getuser.userId
        }, "secret", {
            expiresIn: "24h"
        });
        let obj={
            token: jwtToken,
            expiresIn: "24h",
            msg: getuser
        }
        return sendResponse({
            res,
            statusCode: 200,
            message: "User logged in successfully",
            data:obj
        });
    }catch(error){
        return sendResponse({
            res,
            statusCode: 401,
            message: "Error while authenticating user",
            error:error 
        });
    }
    

}










module.exports={
    login,
    register,

}

