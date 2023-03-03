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


app.use('/api', users)

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
})