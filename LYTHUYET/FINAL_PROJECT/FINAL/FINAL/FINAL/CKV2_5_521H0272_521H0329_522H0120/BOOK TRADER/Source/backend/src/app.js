const express = require('express')
const { Error } = require('mongoose')
const app = express()
const cookies = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

// middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies())

// db
require('./db/init.mongodb')

// router
app.use('/', require('./routes'))

// handle error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    return res.status(status).json({
        status: 'error',
        code: 'ER',
        message: error.message + "." || "Internal Server Error."
    })
})


module.exports = app