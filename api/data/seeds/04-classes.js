exports.seed = function(knex) {
    return knex('classes').del()
      .then(function () {
        return knex('classes').insert([
          {class_name: 'Mindful Yoga', class_start_time: '09:00', class_type: 'Yoga', class_duration: '30', class_intensity_level: 1, class_location: 'Miami', max_class_size: '15', instructor_id: 1 },
          {class_name: 'Kickin with Marge', class_start_time: '11:00', class_type: 'Kickboxing', class_duration: '60', class_intensity_level: 5, class_location: 'Fort Lauderdale', instructor_id: 2 },
          {class_name: 'HIIT Core', class_start_time: '03:00', class_type: 'HIIT', class_duration: '90', class_intensity_level: 2, class_location: 'Miami Beach', max_class_size: '10', instructor_id: 3 },
          {class_name: 'Spin The Globe', class_start_time: '12:00', class_type: 'Spin', class_duration: '45', class_intensity_level: 1, class_location: 'Miami', max_class_size: '25', instructor_id: 3 }
        ]);
      });
  };