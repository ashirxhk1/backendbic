const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {userRegister,login,logout,addLeader,deleteLeader,fetchTeamLead,fetchUser,fetchUserById} = require('./controller/users')
const {escalation} = require("./controller/escalation")
const {evaluation} = require("./controller/evaluation")
const {auth} = require('./middleware/auth')
const parser = require("cookie-parser")
const cors = require("cors")
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.post("/register",userRegister)
app.post("/login",login)
app.get('/getallusers',auth,fetchUser)
app.get('/logout',auth,logout)
app.post('/createEscalation',upload.single('audio'),auth,escalation)
app.post('/createEvaluation',auth,evaluation)
app.post('/createteamLeaders',auth,addLeader)
app.delete('/leaddelete/:id',auth,deleteLeader)
app.get('/fetchleaders',auth,fetchTeamLead)
app.get('/fetchuserbyid/:id',fetchUserById)

// app.post('/upload',upload.single('agentaudio'),(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
// })
app.get("/test",(req,res) =>{
    res.status({message:"test!"})
})

app.listen(8000,()=>{
    console.log('server is running')
})

