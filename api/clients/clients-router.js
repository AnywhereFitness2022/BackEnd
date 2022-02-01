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

//[GET]/clients/classes/:client_id *public access to each individual classes by id*
router.get('/public/classes/:class_id', (req, res, next) => { 
    Clients.findClassById(req.params.class_id)
        .then(classes => {
            res.json(classes)
        })
        .catch(next)
})

//[GET]/clients/class *restricted - get all classes that clients registered for *
//find that one project where it shows a another object with classes?
router.get('/:client_id/classes', restrictedForClients, (req, res, next) => { 
    Clients.getAllClassesAuth(req.params.client_id)
        .then(allAuthClasses => {
            res.status(200).json(allAuthClasses)
        })
        .catch(next)
})

//[POST]/clients/register *register new clients*
router.post('/register', clientNameDoExist, (req, res, next) => { //need middlewares for validation for body
    let { username, password } = req.body
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
    Clients.insertUser({username, password: hash})
        .then(newUser => {
            res.json(newUser)
        })
        .catch(next)
})

//[POST]/clients/login *registered users only can log in*
router.post('/login', checkClientNameValid, (req, res, next) => {
    const { password } = req.body
    
    if(bcrypt.compareSync(password, req.clientAccountData.password)) {
        const token = clientTokenBuilder(req.clientAccountData)
            res.json({
                status: 201,
                message: `Welcome ${req.clientAccountData.username}! Let's Fitness!`, 
                token
            })
    } else {
        next({
            status: 401,
            message: 'Invalid credentials'
        })
    }
})

module.exports = router;