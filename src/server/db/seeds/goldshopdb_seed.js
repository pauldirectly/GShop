
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert([
        {name: "name1", last_name: "lastName1", phone_number:"089-2222201", line_id: "line1"},
        {name: "name2", last_name: "lastName2", phone_number:"089-2222202", line_id: "line2"},
        {name: "name3", last_name: "lastName3", phone_number:"089-2222203", line_id: "line3"},
        {name: "name4", last_name: "lastName4", phone_number:"089-2222204", line_id: "line4"},
        {name: "name5", last_name: "lastName5", phone_number:"089-2222205", line_id: "line5"},
        {name: "name6", last_name: "lastName6", phone_number:"089-2222206", line_id: "line6"},
      ]);
    });
};
