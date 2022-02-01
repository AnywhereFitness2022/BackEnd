const bcrypt = require('bcryptjs')
const { SEED_PASSWORD } = process.env

let password = '';

const hash = bcrypt.hashSync(SEED_PASSWORD, 8)

exports.seed = function(knex) {
  return knex('instructors').del()
    .then(function () {
      return knex('instructors').insert([
        { username: 'PeterParker', password: password = hash, role: 'instructor' },
        { username: 'TonyStark', password: password = hash, role: 'instructor' },
        { username: 'WandaVision', password: password = hash, role: 'instructor' },
        
      ]);
    });
};