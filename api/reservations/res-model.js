const db = require('../data/db-config')

async function addReservations(class_id, client_id) {
    // insert into reservations (class_id, client_id) values ('2', '3');
    const newRes = {class_id, client_id}
    const [returnedNewRes] = await db('reservations')
        .insert(
            returnedNewRes,
            ['reservations_id', 'client_id']
        )

        console.log(returnedNewRes);
        return 'trying to add shit'
}

function getAllReservations(client_id){
    return db('reservations as r')
        .join('classes as c', 'r.class_id', 'c.class_id')
        .join('clients as cl', 'r.client_id', 'cl.client_id')
        .select(
            'reservations_id',
            'cl.username',
            'class_name',
            'class_type',
            'class_start_time',
            'class_duration',
            'class_intensity_level',
            'class_location'
        )
        .where('cl.client_id ', client_id)
}

module.exports = {
    addReservations,
    getAllReservations
}