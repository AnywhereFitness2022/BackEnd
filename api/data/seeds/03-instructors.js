exports.seed = function(knex) {
  return knex('instructors').del()
    .then(function () {
      return knex('instructors').insert([
        { username: 'PeterParker', password: '$2a$08$YPqrdlLzJZ1A1R2vr9le/ecdhRy5SF1UHRAgf73Ky.0DBwlOlU8L.', role: 'instructor' }, //password: 1234
        { username: 'TonyStark', password: '$2a$08$YPqrdlLzJZ1A1R2vr9le/ecdhRy5SF1UHRAgf73Ky.0DBwlOlU8L.', role: 'instructor' }, //password: 1234
        { username: 'WandaVision', password: '$2a$08$YPqrdlLzJZ1A1R2vr9le/ecdhRy5SF1UHRAgf73Ky.0DBwlOlU8L.', role: 'instructor' }, //password: 1234
        
      ]);
    });
};