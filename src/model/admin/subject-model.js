const dateHelper = require('../../helper/date-helper')
const connection = require('../database')

const viewAllSubjects = (req, res) => {
    const query = `
    SELECT * FROM subjects
    `
    connection.query(query, (err, results) => {
        if(!err) {
            if(results.length > 0) {
                res.json({
                    success: true,
                    response: results
                })
            } else {
                res.json({
                    success: true,
                    response: 'no records found'
                })
            }
        } else {
            res.json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

const viewSubjectById = (req, res) => {
    const param = req.params.id
    const query = `
    SELECT * FROM subjects
    WHERE id = ?
    `
    connection.query(query, param, (err, results) => {
        if(!err) {
            if(results.length > 0) {
                res.json({
                    success: true,
                    response: results
                })
            } else {
                res.json({
                    success: true,
                    response: 'no records found'
                })
            }
        } else {
            res.json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

const checkIfSubjectExists = (data, req, res) => {
    return new Promise((resolve, reject) => {
        const query = `
          SELECT * FROM subjects
          WHERE code = ? AND name = ?
        `
        const values = [data.code, data.name]
    
        connection.query(query, values, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result.length > 0)
          }
        })
    })
}

const subjectIdExists = (data, req, res) => {
    const param = data.id
    return new Promise((resolve, reject) => {
        const query = `
          SELECT * FROM subjects
          WHERE id = ?
        `
        const values = [param]
    
        connection.query(query, values, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result.length > 0)
          }
        })
    })
}

const createSubject = (data, req, res) => {
    const query = `
    INSERT INTO subjects
    (course_id, code, name, description, 
    professor, accessed_by_year, accessed_by_section,
    updated_by, date_updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
        data.course_id,
        data.code,
        data.name,
        data.description,
        1,
        data.accessed_by_year,
        data.accessed_by_section,
        'admin',
        dateHelper.getCurrentDate()
    ]

    connection.query(query, values, (err, results) => {
        if(!err) {
            res.json({
                success: true,
                response: `subject ${data.code} | ${data.name} added`
            })
        } else {
            res.json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

const updateSubject = (data, req, res) => {
    const param = req.params.id
    const query = `
        UPDATE subjects
        SET course_id = ?, code = ?,
        name = ?, description = ?, 
        professor = ?, accessed_by_year = ?, 
        accessed_by_section = ?, updated_by = ?,
        date_updated = ? WHERE id = ?
    `
    const values = [
        data.course_id,
        data.code,
        data.name,
        data.description,
        1,
        data.accessed_by_year,
        data.accessed_by_section,
        'admin',
        dateHelper.getCurrentDate(),
        param
    ]
    connection.query(query, values, (err, result) => {
        if(!err) {
            res.json({
                success: true,
                response: `subject ${data.code} | ${data.name} updated successfully`
            })
        } else {
            res.json({
                sucess: false,
                response: err.sqlMessage
            })
        }
    })
}

const deleteSubject = (req, res) => {
    const param = req.params.id
    const query = `
    DELETE FROM subjects WHERE id = ?
    `
    connection.query(query, param, (err, result) => {
        if(!err) {
            res.json({
                success: true,
                response: `subject id ${param} successfully deleted`
            })
        } else {
            res.json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

module.exports = {
    viewAllSubjects,
    viewSubjectById,
    checkIfSubjectExists,
    subjectIdExists,
    createSubject,
    updateSubject,
    deleteSubject
}