require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

require('./db')
require('./middlewares')
require('./models')
require('./util')

const port = process.env.PORT

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/routes'))

app.listen(port, console.log(
    '\x1b[36m%s\x1b[0m',
    `${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} Server started on port ${port}...`)
)