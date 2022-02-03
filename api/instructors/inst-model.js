const db = require('../data/db-config')

function getAllClasses(inst_id){
    return db('classes as c')
        .select(
            'i.instructor_id',
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

function getClassById(class_id){
    return db('classes').where('class_id', class_id)
}

async function getClass(inst_id, class_id){
    const allClasses = await getAllClasses(inst_id)
    const oneClass = allClasses.filter(eachClass => {
        return eachClass.class_id === parseInt(class_id)
    })
    return oneClass[0]
}

function findBy(user){
    return db('instructors')
        .select('instructor_id', 'username', 'role', 'password')
        .where('username', user)
        .first()
}

async function createClass(newClass){
    const [newlyCreatedClass] = await db('classes').insert(newClass, [
        'class_id',
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

function updateClass(body){
    console.log('what is body', body);
    // const {class_id} = body
    return db('classes')
        .where('class_id', body.class_id)
        .update(body)
}

module.exports = {
    getAllClasses,
    findBy,
    createClass,
    deleteClass,
    updateClass,
    getClass,
    getClassById
}