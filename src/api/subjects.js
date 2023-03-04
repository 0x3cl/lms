const router = require('express').Router()
const secureApi = require('../middleware/authApi')
const { checkIfSubjectExists, subjectIdExists, validateSubjects } = require('../middleware/validation-middleware')
const subjectsModel = require('../model/admin/subject-model')


// VIEW ALL SUBJECTS
router.get('/view/subject/all', (req, res) => {
    subjectsModel.viewAllSubjects(req, res)
})

// VIEW SUBJECTS BY ID
router.get('/view/subject/:id', secureApi, (req, res) => {
    subjectsModel.viewSubjectById(req, res)   
})

// CREATE OR ADD SUBJECT
router.post('/create/subject', validateSubjects, checkIfSubjectExists, (req, res) => {
    subjectsModel.createSubject(req.body, req, res)
})

// UPDATE SUBJECT
router.put('/update/subject/:id', secureApi, validateSubjects, subjectIdExists, (req, res) => {
    subjectsModel.updateSubject(req.body, req, res)
})

// DELETE COURSE
router.delete('/delete/subject/:id', secureApi, subjectIdExists, (req, res) => {
    subjectsModel.deleteSubject(req, res)
})


module.exports = router