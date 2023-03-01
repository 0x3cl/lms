const connection = require('../database')

const viewStudents = (req, res) => {
    const query = `
    SELECT 
    users.email, users.username, 
    users.joinedOn, students.first_name, 
    students.last_name, students.bday, 
    students.civil_status, students.gender, 
    students.bio, students.address, 
    students.municipality, students.city, 
    students.course, students.year, 
    students.section, students.fb_link, 
    students.ig_link, students.updated_on 
    FROM users JOIN students 
    WHERE users.id = students.id 
    AND users.role = 1
    `
    connection.query(query, (err, result) => {
        if (!err) {
            if(result.length > 0) {
                res.status(200).json({
                    success: true,
                    total: result.length,
                    response: result
                })
            } else {
                res.status(500).json({
                    success: true,
                    response: 'no records found'
                })
            }
            
        } else {
            res.status(500).json({
                success: false,
                response: err
            })
        }
    })
}

const viewStudentsByID = (req, res) => {
    const param = req.params.id
    const query = `
    SELECT 
    users.email, users.username, 
    users.joinedOn, students.first_name, 
    students.last_name, students.bday, 
    students.civil_status, students.gender, 
    students.bio, students.address, 
    students.municipality, students.city, 
    students.course, students.year, 
    students.section, students.fb_link, 
    students.ig_link, students.updated_on 
    FROM users JOIN students 
    ON users.id = students.id 
    WHERE users.id = '${param}' AND users.role = 1
    `
    connection.query(query, (err, result) => {
        if (!err) {
            if(result.length > 0) {
                res.status(200).json({
                    success: true,
                    response: result
                })
            } else {
                res.status(500).json({
                    success: true,
                    response: 'no records found'
                })
            }
        } else {
            res.status(500).json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

const viewTeachers = (req, res) => {
    const query = `
    SELECT users.id, users.role, 
    users.email, users.username, 
    users.password, users.status, 
    teachers.first_name, teachers.last_name, 
    teachers.bday, teachers.civil_status, 
    teachers.gender, teachers.bio, 
    teachers.address, teachers.municipality, 
    teachers.city, teachers.fb_link, 
    teachers.ig_link, users.status, 
    teachers.updated_on AS joinedOn 
    FROM users JOIN teachers 
    ON users.id = teachers.id 
    WHERE users.role = 2
    `
    connection.query(query, (err, result) => {
        if (!err) {
            if(result.length > 0) {
                res.status(200).json({
                    success: true,
                    total: result.length,
                    response: result
                })
            } else {
                res.status(500).json({
                    success: true,
                    response: 'no records found'
                })
            }
            
        } else {
            res.status(500).json({
                success: false,
                response: err
            })
        }
    })
}

const viewTeachersByID = (req, res) => {
    const param = req.params.id
    const query = `
    SELECT users.email, users.username, 
    users.status, users.joinedOn, 
    teachers.first_name, teachers.last_name, 
    teachers.bday, teachers.civil_status, 
    teachers.gender, teachers.bio, 
    teachers.address, teachers.municipality, 
    teachers.city, teachers.fb_link, 
    teachers.ig_link, teachers.updated_on
    FROM users JOIN teachers ON users.id = teachers.id 
    WHERE users.id = '${param}' 
    AND users.role = 2
    `
    connection.query(query, (err, result) => {
        if (!err) {
            if(result.length > 0) {
                res.status(200).json({
                    success: true,
                    response: result
                })
            } else {
                res.status(500).json({
                    success: true,
                    response: 'no records found'
                })
            }
        } else {
            res.status(500).json({
                success: false,
                response: err.sqlMessage
            })
        }
    })
}

module.exports = {
    viewStudents,
    viewStudentsByID,
    viewTeachers,
    viewTeachersByID
}