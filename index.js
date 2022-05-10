const express = require('express')
const app= express();
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authroutes = require("./authroutes/routes")
const basicroutes = require("./basicroutes/dashboard")

dotenv.config()


app.use(bodyParser.json())



//connect to mongodb

mongoose.connect(process.env.DB_CONNECT,()=>{
    console.log("Database has been successfully connected");
})
mongoose.Promise=global.Promise



//intialize authroutes

app.use('/auth', authroutes)

//initialize basic routes

app.use('/user', basicroutes)



app.listen(process.env.PORT || 3009 ,()=>{
    console.log("Node Server successfully running");
})