const utils = require("../utils/utils");

const knex = require("../db/connection");

async function list() {
    return knex("customers").select("*");
}

async function getById(id) {
    return knex("customers").select("*").where({id});
}
async function add( newCustomber) {
    
    const result = knex("customers").insert(newCustomber).returning("*");
    return result;
} 

async function deleteById(id) {
    const array = knex("customers").delete().where({id}).returning("*");
    return array;
}

// return the update customer
// or throw 404/E_REQUEST_OBJECT_NOT_FOUND if not found
async function updateById(nId, oUpdateData) {
    const array = await knex("customers").where( {id:nId}).update(oUpdateData).returning("*");


    if (array.length==0) utils.throwError( 404, "E_REQUEST_OBJECT_NOT_FOUND");
    return array[0];
}

module.exports = {
    list, getById, add, deleteById, updateById
};

