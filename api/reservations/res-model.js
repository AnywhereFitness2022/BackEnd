const db = require('../data/db-config')


async function addReservations(client_id, class_id) {
    //creating the reservation
    const newResv = { client_id, class_id }
    const [ newlyCreated ] = await db('reservations').insert(newResv, ['reservations_id', 'class_id'])

    //searching for class id in classes where class_id = class_id
    let reservClass = await db('classes')
        .where('class_id', newlyCreated.class_id)
        .first()

    // updating total_clients in classes where class_id = class_id to increment by 1
    await db('classes')
        .where('class_id', class_id)
        .update('total_clients', reservClass.total_clients + 1)

    //returning classes with selected columns with the updated total_clients
    return db('classes')
        .select(
            'class_name',
            'class_type',
            'class_start_time',
            'class_duration',
            'total_clients'
        )
        .where('class_id', newlyCreated.class_id)
        .first()
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

function removeReservation(class_id){
    return db('reservations')
}

module.exports = {
    addReservations,
    getAllReservations
}