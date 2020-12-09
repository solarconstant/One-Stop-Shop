const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')        //to require all files from a folder at once

require('dotenv').config()

//Import Routes
const authRoutes = require('./routes/auth')
const { auth } = require('firebase-admin')

const app = express()

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})
.then(() => console.log('DB Connected successfully.'))   
.catch(err => console.log('DB Connection failed: ', err))

//Middlewares
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "2mb"}))        //If client send data bigger than 2mb, error occurs
app.use(cors())

//routes dynamically
fs.readdirSync('./routes').map((route) => app.use("/api", require(`./routes/${route}`)))

//port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server running at Port ${port}`))