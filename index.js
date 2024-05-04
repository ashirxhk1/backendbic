const express = require('express')
const app = express()
const mongoose = require("mongoose")
// const {users} = require('./controller/users')
const parser = require("cookie-parser")
const cors = require("cors")
const users = require("./model/user")

require("dotenv").config()
mongoose.connect(process.env.mongo_db_url).then(
    () => {
        console.log("connection successfully")
    }
).catch((err) => {
    console.log(err)
})
app.use(parser())
app.use(cors())
app.post("/register",async(req,res) => {
    try {
        const data = {
            email:req.body.email,
            password:req.body.password,
        }
        const detials = await users(data)
        await detials.save()
        res.status(202).json({detials,message:"created"})
    } catch (error) {
        res.status(500).json({message:error})
    }
})
app.get("/test",(req,res) =>{
    res.status({message:"test!"})
})
app.listen(8000,()=>{
    console.log('server is running')
})