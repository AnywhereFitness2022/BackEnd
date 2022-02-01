const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs')
const Instructors = require('./inst-model')
const instructorTokenBuilder = require('./inst-token-builder')
const db = require('../data/db-config')


const restricted = (req, res, next) => {
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

const onlyInstructors = (req, res, next) => {
    // console.log('before req.clientAccountData.password', req.clientAccountData.role);
    // if(req.clientAccountData.role === 'instructor'){
    //     next()
    // } else {
    //     next({
    //         status: 403,
    //         message: 'Only instructors are allowed here'
    //     })
    // }
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

module.exports = {
    onlyInstructors,
    checkInstructorValid,
    restricted
}