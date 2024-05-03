const express = require('express')
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.mongo_db_url).then(
    () => {
        console.log("connection successfully")
    }
).catch((err) => {
    console.log(err)
})
app.listen(8005,()=>{
    console.log('server is running')
})