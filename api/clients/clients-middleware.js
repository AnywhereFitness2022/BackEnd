const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const Client = require('./clients-model')


const checkClientNameValid = async (req, res, next) => {
    Client.findBy(req.body.username)
    .then(clientAccountData => {
        if(clientAccountData) { 
            req.clientAccountData = clientAccountData
            next()
        } else {
            next({
                message: 'Please provide correct credentials'
            })
        }
    })
    .catch(err => {
        console.log(err);
        next(err)
    })
}

const clientNameDoExist = (req, res, next) => {
    Client.findBy(req.body.username)
        .then(client => {
            if(!client) {
                next()
            } else {
                next({
                    status: 422,
                    message: `Username ${client.username} already exists. Please provide another client name`
                })
            }
        })
        .catch(next)
}

const restrictedForClients = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        next({
            status: 401,
            message: 'Token required!'
        })
    } else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                next({
                    status: 401, 
                    message: 'Invalid token!'
                })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    }
}

const clientRoleOnly = role => (req, res, next) => {
    // console.log('what is decoded token', req.decodedToken);
    if(req.decodedToken.role === role){
        next()
    } else {
        next({
            status: 401,
            message: 'You do not have permission to access this'
        })
    }
}

module.exports = {
    checkClientNameValid,
    clientNameDoExist,
    restrictedForClients,
    clientRoleOnly,
}