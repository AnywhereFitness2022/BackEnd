const router = require('express').Router()

router.post('/', (req, res, next) => {
    next({
        message: 'hello'
    })
})



module.exports = router;