const router = require('express').Router()
const Reservations = require('./res-model')
const { restrictedForClients } = require('../clients/clients-middleware')

router.post('/', (req, res, next) => {
    next({
        message: 'hello'
    })
})

router.get('/:client_id', restrictedForClients, (req, res, next) => {
    Reservations.getAllReservations(req.params.client_id)
        .then(reservations => {
            res.json(reservations)
        })
        .catch(next)
})



module.exports = router;