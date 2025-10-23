const {
  createProcedures,
  dropProcedures,
} = require("../procedures/building_use_procedures");

exports.up = async function (knex) {
  await knex.schema.createTable("building_use", function (table) {
    table.integer("bldg_use_id").primary().notNullable();
    table.string("bldg_use_desc", 30).notNullable();
    table.integer("bldg_use_group_id").notNullable();
    table.json("metadata").nullable();
  });

  await createProcedures(knex);
};

exports.down = async function (knex) {
  await knex.schema.dropTable("building_use");
  await dropProcedures(knex);
};
