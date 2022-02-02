const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Clients = require('./clients-model')
const clientTokenBuilder = require('./clients-token-builder')
const { BCRYPT_ROUNDS } = require('../secrets')
const { 
    checkClientNameValid, 
    clientNameDoExist, 
    restrictedForClients,
    clientRoleOnly,
}  = require('./clients-middleware')
const { checkClassFull } = require('../reservations/res-middleware')

//[GET] /classes *public access*
router.get('/classes/public', (req, res, next) => {
    Clients.getAllClasses()
        .then(allPublicClasses => {
            res.json(allPublicClasses)
        })
        .catch(next)
})

// [GET] / *restricted get all classes*
router.get('/classes', restrictedForClients, clientRoleOnly('client'), (req, res, next) => {
    Clients.getAllClasses()
        .then(allClasses => {
            res.json(allClasses)
        })
        .catch(next)
})

//[GET] /class/:class_id *restricted get class by class_id*
router.get('/classes/:class_id', restrictedForClients, clientRoleOnly('client'), (req, res, next) => {
    Clients.findClassById(req.params.class_id)
        .then(gettingClass => {
            // console.log(gettingClass);
            res.json(gettingClass)
        })
        .catch(next)
})

//[GET] /:client_id/classes *restricted for clients to retrieve all reserved classes*
router.get('/:client_id/classes', restrictedForClients, clientRoleOnly('client'), (req, res, next) => {
    Clients.getAllReservations(req.params.client_id)
        .then(reservations => {
            res.json(reservations)
        })
        .catch(next)
})

//[POST] /clients/register *register new clients*
router.post('/register', clientNameDoExist, (req, res, next) => {
    let { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    Clients.insertUser({username, password: hash})
        .then(newUser => {
            res.json({
                message: `Welcome to Anywhere Fitness, ${newUser.username}!`
            })
        })
        .catch(next)
})

//[POST] /clients/login *registered users only can log in*
router.post('/login', checkClientNameValid, (req, res, next) => {
    const { password } = req.body
    if(bcrypt.compareSync(password, req.clientAccountData.password)) {
        const token = clientTokenBuilder(req.clientAccountData)
            res.json({
                message: `Welcome ${req.clientAccountData.username}! Let's Fitness!`, 
                token
            })
    } else {
        next({
            message: 'Invalid credentials'
        })
    }
})

//[POST] /add/:class_id *restricted for clients to add a class*
router.post('/add/:class_id', restrictedForClients, checkClassFull, clientRoleOnly('client'), (req, res, next) => {
    const client_id = req.decodedToken.client_id;
    const class_id = req.params.class_id
    
    Clients.addReservations(client_id, class_id)
        .then(reservedClass => {
            res.json({
                message: `You have reserved a spot for ${reservedClass.class_name}`
            })
        })
        .catch(next)
})

//[DELETE] /remove/:class_id
router.delete('/:client_id/remove/:class_id', restrictedForClients, clientRoleOnly('client'), (req, res, next) => {
    const { client_id, class_id} = req.params
    Clients.removeReservation(client_id, class_id)
        .then(deletedClass => {
            // console.log('what is deletedClass after .then()', deletedClass); returns 1 => # of rows affected
            res.json({
                message: `class has been removed from your reservations`
            })
        })
        .catch(next)
})

module.exports = router;