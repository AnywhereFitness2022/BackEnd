const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs')

function instructorTokenBuilder(inst){
    const payload ={
        subject: inst.instructor_id,
        username: inst.instructor_name,
        role_name: inst.role,
    }
    const options = {
        expires: '1h'
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    return token
}

module.exports = instructorTokenBuilder;