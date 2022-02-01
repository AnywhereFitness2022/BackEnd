const router = require('express').Router()
const Instructors = require('./inst-model')
const bcrypt = require('bcryptjs')
const { restricted, checkInstructorValid } = require('./inst-middleware')
const makeToken = require('./inst-token-builder')



//[GET]/instructors/:inst_id/classes *get all classes held by one specific instructor*
router.get('/:inst_id/classes', 
    restricted,
    (req, res, next) => { 
        Instructors.getAllClasses(req.params.inst_id)
            .then(myClasses => {
                res.json(myClasses)
            })
            .catch(next)
})

//[GET]/instructors/login *login for instructors only*
router.post('/login', checkInstructorValid, (req, res, next) => {
    const { password } = req.body
    if(bcrypt.compareSync(password, req.instructorAccountData.password)) {
        const token = makeToken(req.instructorAccountData)
            res.json({
                message: `Welcome ${req.instructorAccountData.username}! Let's change fitness!`, 
                token
            })
    } else {
        next({
            message: 'Invalid credentials'
        })
    }

    next()
})

//need update
//need create new class
//need delete
module.exports = router;