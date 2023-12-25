const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors=require('cors')
app.use(bodyParser.json())
dotenv.config()
app.use(cors())

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("db connected");
}).catch((error) => {
    console.log(error);
})


app.use('/todo', require('./routes/todoApis'))


app.listen(3000, () => {
    console.log("server connected");
})