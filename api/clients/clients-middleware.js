// const { findBy } = require('./clients-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs')
const Client = require('./clients-model')
// const db = require('../data/db-config')


const checkClientNameValid = async (req, res, next) => {
    Client.findBy(req.body.username)
    .then(clientAccountData => {
        if(clientAccountData) { 
            req.clientAccountData = clientAccountData
            next()
        } else {
            next({
                message: 'Please provide correct username and password'
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
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                next({
                    status: 401, 
                    message: 'Invalid token!'
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    }
}

module.exports = {
    checkClientNameValid,
    clientNameDoExist,
    restrictedForClients
    
}