const bcrypt = require('bcryptjs')
const { SEED_PASSWORD } = process.env

let password = '';

const hash = bcrypt.hashSync(SEED_PASSWORD, 8)

exports.seed = function(knex){
    return knex('clients').del()
        .then(function(){
            return knex('clients').insert([
                { client_name: 'Homer', password: password = hash, role: 'client' },
                { client_name: 'Marge', password: password = hash, role: 'client' },
                { client_name: 'Maggie', password: password = hash, role: 'client' }
            ])
        })
}