const router = require('express').Router()
const Reservations = require('./res-model')
const { restrictedForClients } = require('../clients/clients-middleware')

router.post('/add/:client_id', (req, res, next) => {
    Reservations.addReservations(req.params.client_id)
        .then(something => {
            console.log(something);
            next()
        })
        .catch(next)
})

//[GET]/:client_id *restricted for clients to retrieve all reserved classes*
router.get('/:client_id', restrictedForClients, (req, res, next) => {
    Reservations.getAllReservations(req.params.client_id)
        .then(reservations => {
            res.json(reservations)
        })
        .catch(next)
})



module.exports = router;