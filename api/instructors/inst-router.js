const router = require('express').Router()
const Instructors = require('./inst-model')
const bcrypt = require('bcryptjs')
const { onlyInstructors, restricted } = require('./inst-middleware')




//[GET]/instructors/:inst_id/classes *get all classes held by one specific instructor*
router.get('/:inst_id/classes', restricted, (req, res, next) => { //need valid role middleware
    Instructors.getAllClasses(req.params.inst_id)
        .then(myClasses => {
            res.json(myClasses)
        })
        .catch(next)
})

router.post('/register', (req, res, next) => { //dont think i need this
    res.json('hello from POST instructors register login')
})

//[GET]/instructors/login *login for instructors only*
router.post('/login', onlyInstructors, (req, res, next) => {
    res.json('hello from POST instructors login endpoint')
    // const { password } = req.body
})

module.exports = router;