
exports.seed = function(knex){
    return knex('clients').del()
        .then(function(){
            return knex('clients').insert([
                { username: 'Homer', password: '$2a$08$YPqrdlLzJZ1A1R2vr9le/ecdhRy5SF1UHRAgf73Ky.0DBwlOlU8L.', role: 'client' }, //password: 1234
                { username: 'Marge', password: '$2a$08$YPqrdlLzJZ1A1R2vr9le/ecdhRy5SF1UHRAgf73Ky.0DBwlOlU8L.', role: 'client' }, //password: 1234
                { username: 'Maggie', password: '$2a$08$YPqrdlLzJZ1A1R2vr9le/ecdhRy5SF1UHRAgf73Ky.0DBwlOlU8L.', role: 'client' }, //password: 1234
            ])
        })
}