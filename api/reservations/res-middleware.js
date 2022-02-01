const Reservations = require('./res-model')

const checkIfClassFull = (req, res, next) => {
    res.json('hello')
}

module.exports = {
    checkIfClassFull
}