
const express=require("express")
const app=require("./app")
const mongoose= require("mongoose")
const dotenv= require("dotenv")

dotenv.config({path:"./.env"})


mongoose.connect(process.env.DATA_BASE)
.then(()=>console.log("db connected"))
.catch((err)=>console.log("error in connecting db",err))


















app.listen(8081,()=>{
    console.log("server is running on port 8081...")
})






