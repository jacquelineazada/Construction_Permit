const {
  createProcedures,
  dropProcedures,
} = require("../procedures/user_account_procedures");

exports.up = async function (knex) {
  await knex.schema.createTable("user_account", function (table) {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("user_password").notNullable();
    table.string("user_type").notNullable();
  });
  await createProcedures(knex);
};
exports.down = async function (knex) {
  await knex.schema.dropTable("user");
  await dropProcedures(knex);
};
