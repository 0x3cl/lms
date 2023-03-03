const router = require('express').Router()
const secureApi = require('../middleware/authApi')
const { checkIfUserStudentExists, checkIfUserTeacherExists, validateUserStudent, validateUserTeacher } = require('../middleware/validation-middleware')
const userModel = require('../model/admin/user-model')


// FETCH ALL USERS
router.get('/view/user/all', secureApi, (req, res) => {
    userModel.viewAllUsers(req, res)
})

// ----------------------------------------------------------------

// STUDENT CREATE READ UPDATE DELETE

// ----------------------------------------------------------------

// FETCH ALL STUDENT USERS
router.get('/view/user/student', secureApi, (req, res) => {
    userModel.viewStudents(req, res)
})

// FETCH SINGLE STUDENT USERS
router.get('/view/user/student/:id', secureApi, (req, res) => {
    userModel.viewStudentsByID(req, res)
})

// CREATE STUDENT USERS
router.post('/create/user/student', validateUserStudent, checkIfUserStudentExists, (req, res) => {
    userModel.createUserStudent(req.body, req, res)
})

// ----------------------------------------------------------------

// TEACHER CREATE READ UPDATE DELETE

// ----------------------------------------------------------------

// FETCH ALL TEACHER USERS
router.get('/view/user/teacher', secureApi, (req, res) => {
    userModel.viewTeachers(req, res)
})

// FETCH SINGLE TEACHER USERS
router.get('/view/user/teacher/:id', secureApi, (req, res) => {
    userModel.viewTeachersByID(req, res)
})

// ----------------------------------------------------------------

// ADMIN CREATE READ UPDATE DELETE

// ----------------------------------------------------------------

// FETCH ALL ADMIN USERS
router.get('/view/user/admin', secureApi, (req, res) => {
    userModel.viewAdmins(req, res)
})

// FETCH SINGLE ADMIN USERS
router.get('/view/user/admin/:id', secureApi, (req, res) => {
    userModel.viewAdminsByID(req, res)
})

// CREATE TEACHERS USERS
router.post('/create/user/teacher', validateUserTeacher, checkIfUserTeacherExists, (req, res) => {
    userModel.createUserTeacher(req.body, req, res)
})


module.exports = router