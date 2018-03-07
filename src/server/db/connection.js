const environment = process.env.NODE_ENV || "development";
const knex = require("knex");
const configMap = require("../../../knexfile.js");
const config = configMap[environment]
const connection = config.connection;
console.log(`Environment: ${environment}`);
console.log(`Database ${connection.database}:${connection.user}`);
module.exports = knex(config);
