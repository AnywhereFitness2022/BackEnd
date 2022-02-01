const router = require('express').Router()
const Instructors = require('./inst-model')
const bcrypt = require('bcryptjs')
const { onlyInstructors, restricted } = require('./inst-middleware')




//[GET]/instructors/:inst_id/classes *get all classes held by one specific instructor*
router.get('/:inst_id/classes', 
    restricted, 
    onlyInstructors,
    (req, res, next) => { 
        Instructors.getAllClasses(req.params.inst_id)
            .then(myClasses => {
                res.json(myClasses)
            })
            .catch(next)
})

//[GET]/instructors/login *login for instructors only*
router.post('/login', onlyInstructors, (req, res, next) => {
    // res.json('hello from POST instructors login endpoint')
    // const { password } = req.body
    Instructors.findBy()
})

module.exports = router;