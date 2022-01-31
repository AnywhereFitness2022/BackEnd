const db = require('../data/db-config.js')

// const updatedClassSize = await  db('classes')
//.where('class_id', client.class_id)
//.increment('current_clients', 1)

function getAllClassesPublic() { 
//   select 
// 	class_id, 
// 	class_name, 
// 	class_type, 
// 	class_intensity_level, 
// 	class_location, 
// 	class_start_time, 
// 	class_duration, 
// 	max_class_size, 
// 	total_clients 
//  from classes
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

function getAllClassesAuth(){
//   select 
// 	class_id, 
// 	i.instructor_name,
// 	class_name, 
// 	class_type, 
// 	class_intensity_level, 
// 	class_location, 
// 	class_start_time, 
// 	class_duration, 
// 	max_class_size, 
// 	total_clients 
//  from classes as c
//  join instructors as i
// on c.instructor_id = i.instructor_id
  return db('classes as c')
  .select(
    'class_id',
    'i.instructor_name',
    'class_name', 
    'class_type', 
    'class_intensity_level', 
    'class_location', 
    'class_start_time', 
    'class_duration', 
    'max_class_size', 
    'total_clients' ,
  )
  .join('instructors as i', 'c.instructor_id', 'i.instructor_id')
  .orderBy('class_start_time')
}

function findClassById(client_id) {
//   select 
// 	class_id,
// 	class_name,
// 	class_start_time,
// 	class_type,
// 	class_duration,
// 	class_intensity_level,
// 	class_location,
// 	total_clients,
// 	max_class_size
// from classes 
// where class_id = 3
  return db('classes')
  .where('class_id', client_id)
}

function findBy(client_name){
  // select * from clients where client_id = client_id;
  return db('clients')
    .select('client_id', 'client_name', 'role')
    .where('client_name', client_name)
    .first()
}

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  const [newUserObject] = await db('clients').insert(user, ['client_id', 'client_name', 'password', 'role'])
  return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

module.exports = {
  getAllClassesPublic,
  getAllClassesAuth,
  findClassById,
  findBy,
  insertUser
}