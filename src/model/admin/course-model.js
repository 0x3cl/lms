const dateHelper = require('../../helper/date-helper')
const connection = require('../database')

const viewAllCourses = (req, res) => {
    const query = `
        SELECT * FROM courses
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

const viewCourseByName = (req, res) => {
    const param = req.params.id
    const query = `
        SELECT * FROM courses WHERE name = ?
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

const checkIfCourseExists = (data, req, res) => {
    return new Promise((resolve, reject) => {
        const query = `
          SELECT * FROM courses
          WHERE name = ?
        `
        const values = [data.name]
    
        connection.query(query, values, (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result.length > 0)
          }
        })
    })
}

const createCourse = (data, req, res) => {
    const query = `
    INSERT INTO courses
    (name, description, added_by, date_added)
    VALUES (?, ?, ?, ?)
    `
    const values = [
        data.name,
        data.description,
        '',
        dateHelper.getCurrentDate()
    ]

    connection.query(query, values, (err, results) => {
        if(!err) {
            res.json({
                success: true,
                response: `course ${data.name} added`
            })
        } else {
            res.json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

const courseIdExists = (data, req, res) => {
    const param = data.id
    return new Promise((resolve, reject) => {
        const query = `
          SELECT * FROM courses
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

const updateCourse = (data, req, res) => {
    const param = req.params.id
    const query = `
        UPDATE courses
        SET name = ?, description = ?
        WHERE id = ?
    `
    const values = [
        data.name,
        data.description,
        param
    ]
    connection.query(query, values, (err, result) => {
        if(!err) {
            res.json({
                success: true,
                response: `course ${param} updated successfully`
            })
        } else {
            res.json({
                sucess: false,
                response: err.sqlMessage
            })
        }
    })
}

const deleteCourse = (req, res) => {
    const param = req.params.id
    const query = `
    DELETE FROM courses WHERE id = ?
    `
    connection.query(query, param, (err, result) => {
        if(!err) {
            res.json({
                success: true,
                response: `course ${param} successfully deleted`
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
    viewAllCourses,
    viewCourseByName,
    checkIfCourseExists,
    courseIdExists,
    createCourse,
    updateCourse,
    deleteCourse
}