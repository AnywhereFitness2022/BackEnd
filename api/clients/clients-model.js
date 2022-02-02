const db = require('../data/db-config.js')

function getAllClassesPublic() { 
  return db('classes')
    .select(
      'class_id', 
      'class_name', 
      'class_type', 
      'class_intensity_level', 
      'class_location', 
      'class_start_time', 
      'class_duration', 
      'max_class_size', 
      'total_clients' 
    )
}

function findClassById(class_id) {
  return db('classes').where('class_id', class_id)
}

function findBy(user){
  return db('clients')
    .select('client_id', 'username', 'role', 'password')
    .where('username', user)
    .first()
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  const [newUserObject] = await db('clients').insert(user, ['client_id', 'username', 'password', 'role'])
  return newUserObject
}

function getAllReservations(client_id){
  return db('reservations as r')
      .join('classes as c', 'r.class_id', 'c.class_id')
      .join('clients as cl', 'r.client_id', 'cl.client_id')
      .select(
          'reservations_id',
          'cl.username',
          'class_name',
          'c.class_id',
          'class_type',
          'class_start_time',
          'class_duration',
          'class_intensity_level',
          'class_location'
      )
      .where('cl.client_id ', client_id)
      .orderBy('class_start_time')
}

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
          'class_id',
          'class_name',
          'class_type',
          'class_start_time',
          'class_duration',
          'total_clients'
      )
      .where('class_id', newlyCreated.class_id)
      .first()
}


async function removeReservation(class_id){
  //delete from reservations where reservations_id = 2
  
  const deletedSomething = await db('reservations')
      .where('class_id', class_id).del()
      //returns # of rows deleted = 1
  //once row is success, go & update the total_clients column in classes table where class_id = class_id
  await db('classes')
      .where('class_id', class_id)
      .update('total_clients')

  return deletedSomething
}

module.exports = {
  getAllClassesPublic,
  findClassById,
  findBy,
  insertUser,
  getAllReservations,
  removeReservation,
  addReservations
}
