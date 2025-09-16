const {
  createProcedures,
  dropProcedures,
} = require("../procedures/bldg_use_group_procedures");

exports.up = async function (knex) {
  await knex.schema.createTable("bldg_use_group", function (table) {
    table.increments("id").primary();
    table.string("bldg_use_grp").notNullable();
    table.string("bldg_use_grp_desc").notNullable();
    table.json("metadata").nullable();
  });
  await createProcedures(knex);
};
exports.down = async function (knex) {
  await knex.schema.dropTable("user");
  await dropProcedures(knex);
};
