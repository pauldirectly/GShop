
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable("customers", (table) => {
            table.increments("id").primary;
            table.string("name").notNullable();
            table.string("last_name").notNullable();
            table.string("phone_number");
            table.string("line_id");
            table.timestamps(true,true);
        }),
        knex.schema.createTable("test", (table) => {
            table.increments("id").primary;
            table.string("name").notNullable;
            table.timestamps(true,true);
        }),
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all( [
        knex.schema.dropTable("customers"),
        knex.schema.dropTable("test"),
    ]);
};

