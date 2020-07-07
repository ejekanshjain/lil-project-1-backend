require('dotenv').config()
const express = require('express')

const MongoDB = require('./db')

const app = express()

app.use(express.json())

app.use('/', require('./routes/routes'))

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}...`))