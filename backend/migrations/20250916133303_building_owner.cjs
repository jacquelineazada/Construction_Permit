const {
  createProcedures,
  dropProcedures,
} = require("../procedures/building_owner_procedures");

/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable("building_owner", function (table) {
    table.increments("bldg_owner_id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("user_account");
    table.string("lastname", 50).notNullable();
    table.string("firstname", 50).notNullable();
    table.string("middlename", 50);
    table.string("tin", 9).notNullable();
    table.string("id_submitted", 20).notNullable();
    table
      .integer("id_issued_town_id")
      .unsigned()
      .notNullable()
      .references("town_id")
      .inTable("town");
    table.string("id_issued_date", 10).notNullable();
    table.string("id_number", 20).notNullable();
    table.string("detailed_address", 100).notNullable();
    table
      .integer("barangay_id")
      .unsigned()
      .references("barangay_id")
      .inTable("barangay");
    table.string("email_add", 100).notNullable();
  });

  await createProcedures(knex);
};

exports.down = async function (knex) {
  await knex.schema.dropTable("building_owner");
  await dropProcedures(knex);
};
