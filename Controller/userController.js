
const User= require("../Model/userSchema")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const signup=async (req,res)=>{
    try{
     const {password,name,email,role,createdAt}= req.body
 const hashpassword= await bcrypt.hash(password, 12)
     const user= await User.create({name,email,role,createdAt,password:hashpassword})
     res.status(201).json({
         status: "Success",
         data: user
     })
 
    }catch(err){
     res.status(400).json({
         status: "fail",
         message: err.message
     })
    }
     
 }
 
 
 const login= async (req,res)=>{
     try{
         const {email,password} = req.body
         const user= await User.findOne({email}).select("+password")
 
 if(!user || !(await bcrypt.compare(password, user.password))){
     return res.status(401).json({
         status: "fail",
         message: "Invalid Email or Password"
     })
 }

 const token= jwt.sign({user: user._id, role: user.role }, process.env.JWT_SECURE, {expiresIn: process.env.JWT_EXPRIES})
         res.status(201).json({
             status: "Success",
             data: user,
             token
         })
         
 
     }catch(err){
      res.status(403).json({
          status: "fail",
          message: err.message
      })
     }
 }
 

 const getallUsers= async (req,res)=>{
    try{
        const user= await User.find()

        res.status(200).json({
            status: "Success",
            result: user.length,
            data: user
        }) 

    }catch(err){
     res.status(404).json({
         status: "fail",
         message: err.message
     })
    }
}







 module.exports= {
    signup,
    login,
    getallUsers
 }