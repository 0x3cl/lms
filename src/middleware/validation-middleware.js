const { body, validationResult } = require('express-validator');
const userModel = require('../model/admin/user-model')
const courseModel = require('../model/admin/course-model')

const checkIfUserStudentExists = (req, res, next) => {
    userModel.checkIfUserStudentExists({
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
    }).then((exists) => {
      if(exists) {
        res.json({
          success: false,
          response: 'id or username or email already taken'
        })
      } else {
        next()
      }
    }).catch((err) => {
      res.json({
        success: false,
        response: err.message
      })
    })
}

const checkIfUserTeacherExists = (req, res, next) => {
  userModel.checkIfUserTeacherExists({
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
  }).then((exists) => {
    if(exists) {
      res.json({
        success: false,
        response: 'id or username or email already taken'
      })
    } else {
      next()
    }
  }).catch((err) => {
    res.json({
      success: false,
      response: err.message
    })
  })
}

const checkIfCourseExists = (req, res, next) => {
  courseModel.checkIfCourseExists({
      name: req.body.name,
  }).then((exists) => {
    if(exists) {
      res.json({
        success: false,
        response: 'course already added'
      })
    } else {
      next()
    }
  }).catch((err) => {
    res.json({
      success: false,
      response: err.message
    })
  })
}

const courseIdExists = (req, res, next) => {
  courseModel.courseIdExists({
    id: req.params.id
  }).then((exists) => {
    if(!exists) {
      res.json({
        success: false,
        response: 'course do not exists'
      })
    } else {
      next()
    }
  }).catch((err) => {
    res.json({
      success: false,
      response: err.message
    })
  })
}

const validateUserStudent = [
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

    body('birthday')
    .notEmpty().withMessage('Birthday is required'),

    body('civil_status')
    .notEmpty().withMessage('Civil Status is required'),

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

const validateUserTeacher = [
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

  body('birthday')
  .notEmpty().withMessage('Birthday is required'),

  body('civil_status')
  .notEmpty().withMessage('Civil Status is required'),

  body('gender')
  .notEmpty().withMessage('Gender is required'),

  body('address')
  .notEmpty().withMessage('Address is required'),

  body('municipality')
  .notEmpty().withMessage('Municipality is required'),

  body('city')
  .notEmpty().withMessage('city is required'),

(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
},
]

const validateCourse = [
  body('name')
  .notEmpty().withMessage('course name is required'),

  body('description')
  .notEmpty().withMessage('course description is required'),
]

module.exports = {
    checkIfUserStudentExists,
    validateUserStudent,
    checkIfUserTeacherExists,
    validateUserTeacher,
    checkIfCourseExists,
    validateCourse,
    courseIdExists
}