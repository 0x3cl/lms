const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const secureApi = (req, res, next) => {
    // if(!req.headers.authorization) {
    //     res.json({
    //         status: 'failed',
    //         response: 'Unauthorized'
    //     })
    // } else {
    //     const authorization_token = req.headers.authorization.split(' ')[1] || req.cookies.token
    //     const secret_key = process.env.ACCESS_TOKEN
    //     jwt.verify(authorization_token, secret_key, (err, decoded) => {
    //         if(err) {
    //             res.json({
    //                 status: 'failed',
    //                 response: req.cookies.token
    //             })
    //         } else {
    //             req.params.id = sanitizeParam(req.params.id)
    //             next()
    //         }
    //     })
    // }
    req.params.id = sanitizeParam(req.params.id)
    next()
}

const sanitizeParam = (param) => {
   return param.replace(/[^a-zA-Z0-9\-]/g, '')
}

module.exports = secureApi