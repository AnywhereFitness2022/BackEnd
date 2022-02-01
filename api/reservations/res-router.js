const router = require('express').Router()
const Reservations = require('./res-model')
const { restrictedForClients } = require('../clients/clients-middleware')


//[POST]/add/:class_id *restricted for clients to add a class*
router.post('/add/:class_id', restrictedForClients, (req, res, next) => {
    const client_id = req.decodedToken.client_id;
    const class_id = req.params.class_id
    console.log(class_id);
    Reservations.addReservations(client_id, class_id)
        .then(something => {
            // console.log(something);
            res.json(something)
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

//[DELETE] /remove/:class_id
router.delete('/remove/:class_id', (req, res, next) => {
    res.json({
        message: 'hello'
    })
    next()
})

module.exports = router;