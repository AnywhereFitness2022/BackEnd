const router = require('express').Router()
const Instructors = require('./inst-model')
const bcrypt = require('bcryptjs')
const { restrictedForInstructors, checkInstructorValid } = require('./inst-middleware')
const makeToken = require('./inst-token-builder')


//[GET]/instructors/:inst_id/classes *get all classes held by one specific instructor*
router.get('/classes/:inst_id', 
    restrictedForInstructors,
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

//[POST]/:inst_id/create *restricted for instructors to create new class*
router.post('/create', restrictedForInstructors, (req, res, next) => { 
    Instructors.createClass(req.body)
        .then(newClass => {
            res.json(newClass)
        })
        .catch(next)
})

//[DELETE]/delete/class_id *restricted for instructors to delete a class*
router.delete('/delete/:class_id', restrictedForInstructors, (req, res, next) => {
    Instructors.deleteClass(req.params.class_id)
        .then(deleted => {
            res.json({
                message: 'Class was successfully deleted'
            })
        })
        .catch(next)
})

module.exports = router;