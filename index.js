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
const path = require('path');
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

app.post("/api/register",userRegister)
app.post("/api/login",login)
app.get('/api/getallusers',auth,fetchUser)
app.get('/api/logout',auth,logout)
app.post('/api/createEscalation',upload.single('audio'),auth,escalation)
app.post('/api/createEvaluation',auth,evaluation)
app.post('/api/createteamLeaders',auth,addLeader)
app.delete('/api/leaddelete/:id',auth,deleteLeader)
app.get('/api/fetchleaders',auth,fetchTeamLead)
app.get('/api/fetchuserbyid/:id',fetchUserById)

app.get('/api/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads', req.params.filename);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.sendFile(file);
});

  
// app.post('/upload',upload.single('agentaudio'),(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
// })
app.get("/test",(req,res) =>{
    res.status({message:"test!"})
})

app.use(express.static(path.join(__dirname,'..','bicdashboard','build')))
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'..','bicdashboard','build','index.html'))
})

app.listen(8000,()=>{
    console.log('server is running')
})

