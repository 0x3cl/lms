const { body, validationResult } = require('express-validator');
const userModel = require('../model/admin/userModel')

const checkIfUserStudentExists = (req, res, next) => {
    userModel.checkIfUserStudentExists({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
    }).then((exists) => {
      if(exists) {
        res.json({
          success: failed,
          response: err.message
        })
      } else {
        next()
      }
    }).catch((err) => {
      res.json({
        success: failed,
        response: err.message
      })
    })
}

const validateBody = [
    body('id')
    .notEmpty().withMessage('ID is required'),

    body('role')
    .notEmpty().withMessage('Role is required'),

    body('username')
    .notEmpty().withMessage('Username is required'),

    body('password')
    .notEmpty().withMessage('Password is required'),

    body('first_name')
    .notEmpty().withMessage('Username is required'),

    body('last_name')
    .notEmpty().withMessage('Username is required'),

    body('bday')
    .notEmpty().withMessage('Birthday is required'),

    body('gender')
    .notEmpty().withMessage('Gender is required'),

    body('address')
    .notEmpty().withMessage('Address is required'),

    body('municipality')
    .notEmpty().withMessage('Municipality is required'),

    body('city')
    .notEmpty().withMessage('city is required'),

    body('course')
    .notEmpty().withMessage('Course is required'),

    body('year')
    .notEmpty().withMessage('Year is required'),

    body('section')
    .notEmpty().withMessage('Section is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
  },
]

module.exports = {
    checkIfUserStudentExists,
    validateBody,
}