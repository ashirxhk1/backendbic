const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {userRegister,login,logout} = require('./controller/users')
const {escalation} = require("./controller/escalation")
const {evaluation} = require("./controller/evaluation")
const {auth} = require('./middleware/auth')
const parser = require("cookie-parser")
const cors = require("cors")

require("dotenv").config()
mongoose.connect(process.env.mongo_db_url).then(
    () => {
        console.log("connection successfully")
    }
).catch((err) => {
    console.log(err)
})
app.use(express.json())
app.use(parser())
app.use(cors())

app.post("/register",userRegister)
app.post("/login",login)
app.get('/logout',auth,logout)
app.post('/createEscalation',auth,escalation)
app.post('/createEvaluation',auth,evaluation)

app.get("/test",(req,res) =>{
    res.status({message:"test!"})
})

app.listen(8000,()=>{
    console.log('server is running')
})

