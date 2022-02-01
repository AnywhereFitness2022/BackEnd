const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const clientRouters = require('./clients/clients-router')
const instructorRouters = require('./instructors/inst-router')
const reservationsRouters = require('./reservations/res-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/clients', clientRouters)
server.use('/api/instructors', instructorRouters)
server.use('/api/reservations', reservationsRouters)

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server
