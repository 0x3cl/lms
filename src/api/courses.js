const router = require('express').Router()
const secureApi = require('../middleware/authApi')
const { checkIfCourseExists, courseIdExists, validateCourse } = require('../middleware/validation-middleware')
const courseModel = require('../model/admin/course-model')


// VIEW ALL COURSE
router.get('/view/course/all', (req, res) => {
    courseModel.viewAllCourses(req, res)
})

// VIEW COURSE BY NAME
router.get('/view/course/:id', secureApi, (req, res) => {
    courseModel.viewCourseByName(req, res)   
})

// CREATE OR ADD COURSE
router.post('/create/course', validateCourse, checkIfCourseExists, (req, res) => {
    courseModel.createCourse(req.body, req, res)
})

// UPDATE COURSE
router.put('/update/course/:id', secureApi, validateCourse, courseIdExists, (req, res) => {
    courseModel.updateCourse(req.body, req, res)
})

// DELETE COURSE
router.delete('/delete/course/:id', secureApi, courseIdExists, (req, res) => {
    courseModel.deleteCourse(req, res)
})

module.exports = router