const mysql = require('mysql')
const dotenv = require('dotenv')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect(err => {
    if(err) {
        console.log('Error cannot connect: ', err.message)
    } else {
        console.log('Connected to database')
    }
})

module.exports = connection