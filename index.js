const express = require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT
const connection = require('./src/model/database')
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// USERS API ENDPOINTS 
const users = require('./src/api/users')
const courses = require('./src/api/courses')
const subjects = require('./src/api/subjects')

app.use('/api', users)
app.use('/api', courses)
app.use('/api', subjects)

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
})