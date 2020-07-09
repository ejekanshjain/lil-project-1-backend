require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

require('./db')

const port = process.env.PORT

const app = express()

app.use(helmet())
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}))
app.use(express.json())

app.use('/', require('./routes/routes'))

app.listen(port, console.log(
    '\x1b[36m%s\x1b[0m',
    `${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} Server started on port ${port}...`)
)