const db = require('../data/db-config')

function getAllClasses(inst_id){
    //select * from classes where instructor_id = 3 order by class_start_time;
    return db('classes')
    .where('instructor_id', inst_id)
}

function findClassById(inst_id, client_id){
    return db('classes')
}

module.exports = {
    getAllClasses,
    findClassById
}