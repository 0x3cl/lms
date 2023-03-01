const router = require('express').Router()
const secureApi = require('../middleware/authApi')
const userModel = require('../model/admin/userModel')

// ----------------------------------------------------------------

// STUDENT CREATE READ UPDATE DELETE

// ----------------------------------------------------------------

// FETCH ALL STUDENT USERS
router.get('/view/user/student', (req, res) => {
    userModel.viewStudents(req, res)
})

// FETCH SINGLE STUDENT USERS
router.get('/view/user/student/:id', secureApi, (req, res) => {
    userModel.viewStudentsByID(req, res)
})

// 
router.post('/create/user/student', (req, res) => {
    
})


// ----------------------------------------------------------------

// TEACHER CREATE READ UPDATE DELETE

// ----------------------------------------------------------------

// FETCH ALL TEACHER USERS
router.get('/view/user/teacher', (req, res) => {
    userModel.viewTeachers(req, res)
})

// FETCH SINGLE TEACHER USERS
router.get('/view/user/teacher/:id', secureApi, (req, res) => {
    userModel.viewTeachersByID(req, res)
})

module.exports = router