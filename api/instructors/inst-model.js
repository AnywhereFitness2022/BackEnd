const db = require('../data/db-config')


// const updatedClassSize = await  db('classes')
//.where('class_id', client.class_id)
//.increment('current_clients', 1)


function getAllClasses(inst_id){
    return db('classes as c')
        .select(
            'i.instructor_name',
            'class_id',
            'class_name',
            'class_type',
            'class_start_time',
            'class_duration',
            'class_intensity_level',
            'class_location',
            'total_clients',
            'max_class_size',
        )
        .join('instructors as i', 'i.instructor_id', 'c.instructor_id')
        .where('c.instructor_id', inst_id)
        .orderBy('class_start_time')
}

function findClassById(inst_id, client_id){
    return db('classes') //still working
}

function findBy(inst_name){
//     select instructor_id, instructor_name, 
// role from instructors 
// where instructor_name = instructor_name
    return db('instructors')
        .select('instructor_id', 'instructor_name', 'role')
        .where('instructor_name', inst_name)

}

module.exports = {
    getAllClasses,
    findClassById,
    findBy,
}