const jwt = require('jsonwebtoken')
// const {} = require('./inst-model')
const { JWT_SECRET } = require('../configs')


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
                req.decoded = decoded
                next()
            }
        })
    }
}

const onlyInstructors = role_name => (req, res, next) => {
    if(req.decoded.role === role_name){
        console.log(req.decoded.role);
        next()
    } else {
        next({
            status: 403,
            message: 'Only instructors are allowed here'
        })
    }
}

const checkIfInstructorIsValid = (req, res, next) => {
    next({
        message: 'you are in the check if instructor name is valid'
    })
}

module.exports = {
    onlyInstructors,
    checkIfInstructorIsValid,
    restricted
}