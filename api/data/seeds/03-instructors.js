const bcrypt = require('bcryptjs')
const { SEED_PASSWORD } = process.env

let password = '';

const hash = bcrypt.hashSync(SEED_PASSWORD, 8)

exports.seed = function(knex) {
  return knex('instructors').del()
    .then(function () {
      return knex('instructors').insert([
        { instructor_name: 'Peter Parker', password: password = hash, role: 'instructor' },
        { instructor_name: 'Tony Stark', password: password = hash, role: 'instructor' },
        { instructor_name: 'Wanda Vision', password: password = hash, role: 'instructor' },
        
      ]);
    });
};