// const { findBy } = require('./clients-model')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs')
const Client = require('./clients-model')
const db = require('../data/db-config')


const checkClientNameValid = async (req, res, next) => {
    const client_name = req.body.client_name
    
    try{
        const client = await db('clients').where('client_name', client_name).first()
        if(client) {
            req.client = client
            next()
        } else {
            next({
                status: 404,
                message: 'Invalid credentials'
            })
        }
    } catch(err) {
        next(err)
    }
    // console.log(req.body.client_name);
    // Client.findBy(req.body.client_name)
    // .then(clientNameValid => {
    //     if(clientNameValid) { 
    //         req.clients = clientNameValid
    //         next()
    //         console.log(clientNameValid);
    //     } else {
    //         next({
    //             status: 404, 
    //             message: 'Invalid credentials'
    //         })
    //     }
    // })
    // .catch(next)
}

const clientNameDoExist = (req, res, next) => {
    Client.findBy(req.body.client_name)
        .then(client => {
            if(!client) {
                next()
            } else {
                next({
                    status: 422,
                    message: `Client name ${client.client_name} already exists. Please provide another client name`
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