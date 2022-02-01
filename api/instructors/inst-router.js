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
    res.json('hello from login instructors endpoint')
    next()
})

module.exports = router;