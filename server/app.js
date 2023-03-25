const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./routes/route.js');
const bodyParser =require("body-parser")


const app =express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// middleware
app.use(cors())

app.use('/', route)

// db

mongoose.connect("mongodb://127.0.0.1:27017/data", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


const port = 5000
app.listen(port,()=>{
    console.log("connect server with 5000")
})


