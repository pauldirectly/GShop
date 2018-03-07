
exports.up = async function (knex, Promise) {

    await knex.schema.createTable("customers", (table) => {
        table.increments("id").primary;
        table.string("name").notNullable();
        table.string("last_name").notNullable();
        table.string("phone_number");
        table.string("line_id");
        table.timestamps(true, true);
    });

    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary;
        table.string("name").notNullable;
        table.string("password").notNullable;
        table.timestamps(true, true);
    });
};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTable("customers");
    await knex.schema.dropTable("users");
};

