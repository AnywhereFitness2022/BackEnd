// const Reservations = require('./res-model')
const db = require('../data/db-config')

async function checkClassFull(req, res, next){
    const { class_id } = req.params

    //select * from classes where class_id = 4;
    const reservingClass = await db('classes')
        .where('class_id', class_id).first()
    if(reservingClass.total_clients >= reservingClass.max_class_size){
        next({
            message: `Sorry, ${reservingClass.class_name} is full. Please reserve a different class that is not full.`
        })
    } else {
        next()
    }
}

module.exports = {
    checkClassFull
}