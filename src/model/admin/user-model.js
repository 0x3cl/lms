const dateHelper = require('../../helper/date-helper')
const connection = require('../database')
const bcrypt = require('bcrypt')

const viewAllUsers = (req, res) => {
    const query = `
    SELECT
    (SELECT COUNT(*) FROM students) as count_students, 
    (SELECT COUNT(*) FROM admin) as count_admins, 
    (SELECT COUNT(*) FROM teachers) as count_teachers,
    (SELECT COUNT(*) FROM courses) as count_courses,
    (SELECT COUNT(*) FROM subjects) as count_subjects
    `
    connection.query(query, (err, result) => {
        if(!err) {
            if(result.length > 0) {
                res.status(200).json({
                    success: true,
                    total: result.length,
                    response: result
                })
            } else {
                res.status(500).json({
                    success: true,
                    total: result.length,
                    response: 'no records found'
                })
            }
        } else {
            res.status(500).json({
                success: false,
                total: result.length,
                response: err,sqlMessage
            })
        }
    })
}

const viewStudents = (req, res) => {
    const query = `
    SELECT users.id,
    users.email, users.username, 
    users.joinedOn, students.first_name, 
    students.last_name, students.birthday, 
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
                response: err,sql
            })
        }
    })
}

const viewStudentsByID = (req, res) => {
    const param = req.params.id
    const query = `
    SELECT users.id,
    users.email, users.username, 
    users.joinedOn, students.first_name, 
    students.last_name, students.birthday, 
    students.civil_status, students.gender, 
    students.bio, students.address, 
    students.municipality, students.city, 
    students.course, students.year, 
    students.section, students.fb_link, 
    students.ig_link, students.updated_on 
    FROM users JOIN students 
    ON users.id = students.id 
    WHERE users.id = ? AND users.role = 1
    `
    connection.query(query, param, (err, result) => {
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
    users.email, users.username, users.status, 
    teachers.first_name, teachers.last_name, 
    teachers.birthday, teachers.civil_status, 
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
                response: err,sql
            })
        }
    })
}

const viewTeachersByID = (req, res) => {
    const param = req.params.id
    const query = `
    SELECT users.id, users.email, users.username, 
    users.status, users.joinedOn, 
    teachers.first_name, teachers.last_name, 
    teachers.birthday, teachers.civil_status, 
    teachers.gender, teachers.bio, 
    teachers.address, teachers.municipality, 
    teachers.city, teachers.fb_link, 
    teachers.ig_link, teachers.updated_on
    FROM users JOIN teachers ON users.id = teachers.id 
    WHERE users.id = ? AND users.role = 2
    `
    connection.query(query, param, (err, result) => {
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

const viewAdmins = (req, res) => {
    const query = `
    SELECT admin.id, admin.first_name, admin.last_name, 
    admin.username, admin.email 
    FROM admin`

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
                    success: false,
                    total: result.length,
                    response: 'no records found'
                })
            }
        } else {
            res.status(500).json({
                success: false,
                total: result.length,
                response: err.sqlMessage
            })
        }
    })

}

const viewAdminsByID = (req, res) => {
    const param = req.params.id
    const query = `
    SELECT admin.id, admin.first_name, admin.last_name, 
    admin.username, admin.email 
    FROM admin WHERE id = ?`

    connection.query(query, param, (err, result) => {
        if (!err) {
            if(result.length > 0) {
                res.status(200).json({
                    success: true,
                    total: result.length,
                    response: result
                })
            } else {
                res.status(500).json({
                    success: false,
                    total: result.length,
                    response: 'no records found'
                })
            }
        } else {
            res.status(500).json({
                success: false,
                total: result.length,
                response: err.sqlMessage
            })
        }
    })

}

const checkIfUserStudentExists = (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM users 
        WHERE id = ? OR 
        username = ? OR 
        email = ? AND role = 1
      `
      const values = [data.id, data.username, data.email]
  
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.length > 0)
        }
      })
    })
}

const createUserStudent = (user, req, res) => {
    bcrypt.hash(user.password, 10, (err, hash_password) => {
        if(err) {

        } else {
            const queryUser = `
                INSERT INTO users (
                    id,
                    role,
                    email,
                    username,
                    password,
                    status,
                    joinedOn
                ) VALUES 
                (?, ?, ?, ?, ?, ?, ?)
            `
            const valuesUser = [
                user.id,
                1,
                user.email,
                user.username,
                hash_password,
                0,
                ''
            ]

            const queryUserData = `
                INSERT INTO students (
                    id,
                    first_name,
                    last_name,
                    birthday,
                    civil_status,
                    gender,
                    bio,
                    address,
                    municipality,
                    city,
                    course,
                    year,
                    section,
                    fb_link,
                    ig_link,
                    updated_on
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?
                )
            `
            const valuesUserData = [
                user.id,
                user.first_name,
                user.last_name,
                dateHelper.dateToText(user.birthday),
                user.civil_status,
                user.gender,
                '',
                user.address,
                user.municipality,
                user.city,
                user.course,
                user.year,
                user.section,
                '',
                '',
                dateHelper.getCurrentDate()
            ]

            connection.query(queryUser, valuesUser, (err, result) => {
                if(err) {
                    res.json({
                        success: false,
                        response: err.sqlMessage
                    })
                } else {    
                    connection.query(queryUserData, valuesUserData, (err, result) => {
                        if(err) {
                            res.json({
                                success: false,
                                response: err.sqlMessage
                            })
                        } else {
                            res.json({
                                success: true,
                                response: `student ${user.id} created successfully`
                            })
                        }
                    })
                }
            })

        }
    })
}

const checkIfUserTeacherExists = (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM users 
        WHERE id = ? OR 
        username = ? OR 
        email = ? AND role = 2
      `
      const values = [data.id, data.username, data.email]
  
      connection.query(query, values, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.length > 0)
        }
      })
    })
  }

const createUserTeacher = (user, req, res) => {
    bcrypt.hash(user.password, 10, (err, hash_password) => {
        if(err) {

        } else {
            const queryUser = `
                INSERT INTO users (
                    id,
                    role,
                    email,
                    username,
                    password,
                    status,
                    joinedOn
                ) VALUES 
                (?, ?, ?, ?, ?, ?, ?)
            `
            const valuesUser = [
                user.id,
                2,
                user.email,
                user.username,
                hash_password,
                0,
                ''
            ]

            const queryUserData = `
                INSERT INTO teachers (
                    id,
                    first_name,
                    last_name,
                    birthday,
                    civil_status,
                    gender,
                    bio,
                    address,
                    municipality,
                    city,
                    fb_link,
                    ig_link,
                    updated_on
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?
                )
            `
            const valuesUserData = [
                user.id,
                user.first_name,
                user.last_name,
                dateHelper.dateToText(user.birthday),
                user.civil_status,
                user.gender,
                '',
                user.address,
                user.municipality,
                user.city,
                '',
                '',
                dateHelper.getCurrentDate()
            ]

            connection.query(queryUser, valuesUser, (err, result) => {
                if(err) {
                    res.json({
                        success: false,
                        response: err.sqlMessage
                    })
                } else {    
                    connection.query(queryUserData, valuesUserData, (err, result) => {
                        if(err) {
                            res.json({
                                success: false,
                                response: err.sqlMessage
                            })
                        } else {
                            res.json({
                                success: true,
                                response: `teacher ${user.id} created successfully`
                            })
                        }
                    })
                }
            })

        }
    })
}


module.exports = {
    viewAllUsers,
    viewStudents,
    viewStudentsByID,
    viewTeachers,
    viewTeachersByID,
    viewAdmins,
    viewAdminsByID,
    checkIfUserStudentExists,
    createUserStudent,
    checkIfUserTeacherExists,
    createUserTeacher,
}