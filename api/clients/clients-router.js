const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Clients = require('./clients-model')
const clientTokenBuilder = require('./clients-token-builder')
const { BCRYPT_ROUNDS } = require('../configs')
const { 
    checkClientNameValid, 
    clientNameDoExist, 
    restrictedForClients 
}  = require('./clients-middleware')
const { checkClassFull } = require('../reservations/res-middleware')

//[GET] / *restricted get all classes*
router.get('/', restrictedForClients, (req, res, next) => {
    Clients.getAllClasses()
        .then(allPublicClasses => {
            res.json(allPublicClasses)
        })
        .catch(next)
})

//[GET] /class/class_id *restricted get class by class_id*
router.get('/class/:class_id', restrictedForClients, (req, res, next) => {
    Clients.findClassById(req.params.class_id)
        .then(gettingClass => {
            console.log(gettingClass);
            res.json(gettingClass)
        })
        .catch(next)
})

//[GET] /:client_id/classes *restricted for clients to retrieve all reserved classes*
router.get('/:client_id/classes', restrictedForClients, (req, res, next) => {
    Clients.getAllReservations(req.params.client_id)
        .then(reservations => {
            res.json(reservations)
        })
        .catch(next)
})

//[POST] /clients/register *register new clients*
router.post('/register', clientNameDoExist, (req, res, next) => { //need middlewares for validation for body
    let { username, password } = req.body
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
    Clients.insertUser({username, password: hash})
        .then(newUser => {
            res.json(newUser)
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
router.post('/add/:class_id', restrictedForClients, checkClassFull, (req, res, next) => {
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
router.delete('/:client_id/remove/:class_id', (req, res, next) => {
    const { client_id, class_id} = req.params
    Clients.removeReservation(client_id, class_id)
        .then(deletedClass => {
            console.log(deletedClass);
            res.json({
                message: `class has been removed from your reservations`
            })
        })
        .catch(next)
})

module.exports = router;