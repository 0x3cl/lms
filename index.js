const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const PORT = process.env.PORT
const connection = require('./src/model/database')
const app = express()

// USERS API ENDPOINTS 
const users = require('./src/api/users')


app.use('/api', users)

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
})