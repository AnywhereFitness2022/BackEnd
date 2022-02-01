const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index');

function clientTokenBuilder(client){
    const payload = {
        client_id: client.client_id,
        client_name: client.username,
        role: client.role,
    }
    const options = {
        expiresIn: '1h'
    }
    const token = jwt.sign(payload, JWT_SECRET, options)

    return token
}

module.exports = clientTokenBuilder;