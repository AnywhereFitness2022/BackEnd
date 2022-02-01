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

const onlyInstructors = (req, res, next) => {
    console.log(req.decoded);
    if(req.decoded.role === 'instructor'){
        next()
    } else {
        next({
            status: 403,
            message: 'Only instructors are allowed here'
        })
    }
}

const checkIfInstructorIsValid = (req, res, next) => {
    // next({
    //     message: 'you are in the check if instructor name is valid'
    // })
    const { instructor_name } = req.body
    
        
}

module.exports = {
    onlyInstructors,
    checkIfInstructorIsValid,
    restricted
}