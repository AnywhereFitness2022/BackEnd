const router = require('express').Router()
const Instructors = require('./inst-model')




//[GET]/instructors/:inst_id/classes *get all classes held by one specific instructor*
router.get('/:inst_id/classes', (req, res, next) => {
    Instructors.getAllClasses(req.params.inst_id)
        .then(myClasses => {
            // console.log(myClasses);
            res.json(myClasses)
        })
        .catch(next)
})

//[GET]/instructors/:inst_id/classes/class_id *get a specific class by a specific instructor*
router.get('/login', (req, res, next) => {
    // res.json('hello from POST instructors login endpoint')
})

router.post('/register', (req, res, next) => {
    res.json('hello from POST instructors register login')
})

module.exports = router;