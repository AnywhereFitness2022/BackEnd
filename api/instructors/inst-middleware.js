const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs')
const Instructors = require('./inst-model')


const restrictedForInstructors = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        next({
            message: 'Token is required!'
        })
    } else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                next({
                    status: 401,
                    message: 'Token invalid!'
                })
            } else {
                req.decodedJWT = decoded
                next()
            }
        })
    }
}

const checkInstructorValid = async (req, res, next) => {
    Instructors.findBy(req.body.username)
        .then(instructorAccountData => {
            if(instructorAccountData) {
                req.instructorAccountData = instructorAccountData
                next()
            } else {
                next({
                    message: 'Please provide correct username and password'
                })
            }
        })
        .catch(err => {
            next(err)
        })
}

const instructorRoleOnly = role => (req, res, next) => {
    if(req.decodedJWT.role === role){
        next()
    } else {
        res.json({
            message: 'You do not have permission to access this'
        })
    }
}


module.exports = {
    checkInstructorValid,
    restrictedForInstructors,
    instructorRoleOnly
}