const bcrypt = require('bcryptjs')
const { SEED_PASSWORD } = process.env

let password = '';

const hash = bcrypt.hashSync(SEED_PASSWORD, 8)

exports.seed = function(knex){
    return knex('clients').del()
        .then(function(){
            return knex('clients').insert([
                { username: 'Homer', password: password = hash, role: 'client' },
                { username: 'Marge', password: password = hash, role: 'client' },
                { username: 'Maggie', password: password = hash, role: 'client' }
            ])
        })
}