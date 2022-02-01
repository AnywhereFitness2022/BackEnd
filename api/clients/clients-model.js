const db = require('../data/db-config.js')

// const updatedClassSize = await  db('classes')
//.where('class_id', client.class_id)
//.increment('current_clients', 1)

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

function getAllClassesAuth(client_id){
  return db('reservations as r')
  .select(
    'cl.client_id',
    'cl.username',
    'class_name',
    'class_type',
    'class_start_time',
    'class_location',
    'class_duration',
  )
  .join('classes as c', 'c.class_id', 'r.class_id')
  .join('instructors as i', 'c.instructor_id', 'i.instructor_id')
  .join('clients as cl','cl.client_id', 'r.client_id')
  .where('r.client_id', client_id)
  .orderBy('class_start_time')
}

function findClassById(class_id) {
  return db('classes')
  .select(
    'class_name', 
    'class_type', 
    'class_start_time', 
    'class_duration', 
    'class_intensity_level', 
    'class_location', 
    'max_class_size'
  )
  .where('class_id', class_id)
  .first()
}

function findBy(user){
  // select * from clients where client_id = client_id;
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

module.exports = {
  getAllClassesPublic,
  getAllClassesAuth,
  findClassById,
  findBy,
  insertUser
}
