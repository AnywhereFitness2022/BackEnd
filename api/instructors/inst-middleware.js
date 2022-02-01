const jwt = require('jsonwebtoken')
// const {} = require('./inst-model')
const { JWT_SECRET } = require('../configs')
const Instructors = require('./inst-model')
const instructorTokenBuilder = require('./inst-token-builder')


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

const checkInstructorValid = (req, res, next) => {
    console.log('req.body before', req.body);
    const { username } = req.body
    console.log('what username is', username);
    Instructors.findBy(username)
        .then(something => {
            console.log('what then responses', something);
            next()
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
}

module.exports = {
    onlyInstructors,
    checkInstructorValid,
    restricted
}