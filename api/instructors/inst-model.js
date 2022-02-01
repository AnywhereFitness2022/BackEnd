const db = require('../data/db-config')


// const updatedClassSize = await  db('classes')
//.where('class_id', client.class_id)
//.increment('current_clients', 1)


function getAllClasses(inst_id){
    return db('classes as c')
        .select(
            'username',
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

function findBy(user){
    return db('instructors')
        .select('instructor_id', 'username', 'role', 'password')
        .where('username', user)
        .first()
}

async function createClass(newClass){
    const [newlyCreatedClass] = await db('classes').insert(newClass, [
        'class_name',
        'class_start_time',
        'class_type',
        'class_duration',
        'class_intensity_level',
        'class_location',
        'max_class_size',
        'instructor_id'
    ])
    return newlyCreatedClass
}

async function deleteClass(class_id){
    return db('classes').where('class_id', class_id).del()
}

module.exports = {
    getAllClasses,
    findBy,
    createClass,
    deleteClass
}