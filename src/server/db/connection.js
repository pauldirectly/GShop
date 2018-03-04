const environment = process.env.NODE_ENV || "development";
const knex = require("knex");
const config = require("../../../knexconfig.js");

module.exports = knex(config[environment]);
