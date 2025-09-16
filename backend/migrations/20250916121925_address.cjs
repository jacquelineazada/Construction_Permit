const {
  createProcedures,
  dropProcedures,
} = require("../procedures/address.procedures");

exports.up = async function (knex) {
  await knex.schema.createTable("province", function (table) {
    table.increments("province_id").primary();
    table.string("province_name").notNullable();
    table.string("region").nullable();
  });

  await knex.schema.createTable("town", function (table) {
    table.increments("town_id").primary();
    table.string("town_name").notNullable();
    table.string("zipcode").notNullable();
    table
      .integer("province_id")
      .unsigned()
      .references("province_id")
      .inTable("province")
      .nullable();
  });

  await knex.schema.createTable("barangay", function (table) {
    table.increments("barangay_id").primary();
    table.string("barangay_name").notNullable();
    table
      .integer("town_id")
      .unsigned()
      .references("town_id")
      .inTable("town")
      .nullable();
  });

  await createProcedures(knex);
};
exports.down = async function (knex) {
  await knex.schema.dropTable("province");
  await dropProcedures(knex);
};
