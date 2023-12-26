const express = require('express')
const app = express()
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors=require('cors')
const db= require('./models/config')
app.use(bodyParser.json())
dotenv.config()
app.use(cors())


app.use('/todo', require('./routes/todoApis'))

db.sync().then(()=>{
    app.listen(3000, () => {
        console.log("server connected");
    })
})


