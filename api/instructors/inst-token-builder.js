const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs')

function instructorTokenBuilder(inst){
    const payload ={
        instructor_id: inst.instructor_id,
        username: inst.instructor_name,
        role: inst.role,
    }
    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
    return token
}

module.exports = instructorTokenBuilder;