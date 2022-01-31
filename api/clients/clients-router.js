const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Clients = require('./clients-model')
const clientTokenBuilder = require('./clients-token-builder')
const { BCRYPT_ROUNDS } = require('../configs')
const { checkClientNameValid, clientNameDoExist, restrictedForClients }  = require('./clients-middleware')


//[GET]/clients/public/classes *public access to all available classes*
router.get('/public/classes', (req, res, next) => {
    Clients.getAllClassesPublic()
        .then(allPublicClasses => {
            res.status(200).json(allPublicClasses)
        })
        .catch(next)
})

//[GET]/clients/class *restricted - *
router.get('/classes', restrictedForClients, (req, res, next) => { //needs restricted middleware
    Clients.getAllClassesAuth()
        .then(allAuthClasses => {
            res.status(200).json(allAuthClasses)
        })
        .catch(next)
})

//[GET]/clients/classes/:id *get a specific class by id*
router.get('/classes/:client_id', restrictedForClients, (req, res, next) => { //needs restricted middleware
    Clients.findClassById(req.params.client_id)
        .then(classes => {
            res.json(classes)
        })
        .catch(next)
})

//[POST]/clients/register *register new clients*
router.post('/register', clientNameDoExist, (req, res, next) => { //need middlewares for validation for body
    let { client_name, password } = req.body
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
    Clients.insertUser({client_name, password: hash})
        .then(newUser => {
            console.log(newUser);
            res.json(newUser)
        })
        .catch(next)
})

//[POST]/clients/login *registered users only can log in*
router.post('/login', checkClientNameValid, (req, res, next) => {
    const { password } = req.body
    if(bcrypt.compareSync(password, req.client.password)) {
        const token = clientTokenBuilder(req.client)
            res.json({
                status: 201,
                message: `Welcome ${req.client.client_name}! Let's Fitness!`, 
                token
            })
    } else {
        next({
            status: 401,
            message: 'Invalid credentials. Please try again with correct name and password.'
        })
    }
})

module.exports = router;