const db = require('../data/db-config')

function createReservations() {
    // insert into reservations (class_id, client_id) values ('2', '3');
    return db('reservations').insert()
}

module.exports = {
    createReservations,
}