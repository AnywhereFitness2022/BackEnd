const bcrypt = require('bcryptjs')
const { SEED_PASSWORD } = process.env

let password = '';

const hash = bcrypt.hashSync(SEED_PASSWORD, 8)

exports.seed = function(knex) {
  return knex('instructors').del()
    .then(function () {
      return knex('instructors').insert([
        { instructor_name: 'PeterParker', password: password = hash, role: 'instructor' },
        { instructor_name: 'TonyStark', password: password = hash, role: 'instructor' },
        { instructor_name: 'WandaVision', password: password = hash, role: 'instructor' },
        
      ]);
    });
};