const Reservations = require('./res-model')
const db = require('../data/db-config')

const checkIfClassFull = (req, res, next) => {
    res.json('hello')
}

module.exports = {
    checkIfClassFull
}