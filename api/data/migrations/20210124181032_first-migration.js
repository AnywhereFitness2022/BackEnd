
exports.up = async (knex) => {
  await knex.schema
    .createTable('clients', (tbl) => {
      tbl.increments('client_id')
      tbl.string('username', 128).notNullable()
      tbl.string('password', 128).notNullable()
      tbl.string('role', 6).defaultTo('client')
      tbl.timestamps(false, true)
    })
    .createTable('instructors', tbl => {
        tbl.increments('instructor_id')
        tbl.string('username', 128).notNullable()
        tbl.string('role', 10).defaultTo('instructor')
        tbl.string('password').notNullable()
    })
      .createTable('classes', tbl => {
          tbl.increments('class_id')
          tbl.string('class_name').notNullable()
          tbl.time('class_start_time').notNullable()
          tbl.string('class_type').notNullable()
          tbl.integer('class_duration').notNullable()
          tbl.integer('class_intensity_level').notNullable()
          tbl.string('class_location').notNullable()
          tbl.integer('total_clients').defaultTo(0)
          tbl.integer('max_class_size').notNullable().defaultTo(5)
          tbl.integer('instructor_id')
              .unsigned()
              .notNullable()
              .references('instructor_id')
              .inTable('instructors')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
      })
      .createTable('reservations', tbl => {
          tbl.increments('reservations_id')
          tbl.integer('class_id')
              .unsigned()
              .notNullable()
              .references('class_id')
              .inTable('classes')
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
          tbl.integer('client_id')
              .unsigned()
              .notNullable()
              .references('client_id')
              .inTable('clients')
              .onUpdate("CASCADE")
              .onDelete("CASCADE")
      })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('reservations')
  await knex.schema.dropTableIfExists('classes')
  await knex.schema.dropTableIfExists('instructors')
  await knex.schema.dropTableIfExists('clients')
}

