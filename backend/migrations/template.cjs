const {
  createProcedures,
  dropProcedures,
} = require("../procedures/templateProcedures");

exports.up = async function (knex) {
  await knex.schema.createTable("tourist", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())")); // UUID PRIMARY KEY
    table.increments("id").primary(); // AUTO INCREMENT PRIMARY KEY
    table.string("field", 30).notNullable();
    table.enu("field", ["sample1", "sample2", "sample3"]).notNullable();
    table.date("field").notNullable();
    table.integer("field").notNullable();

    // Foreign keys
    table
      .integer("field_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("table_name")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await createProcedures(knex); // Call the createProcedures function to set up the stored procedures
};

exports.down = async function (knex) {
  await knex.schema.dropTable("tourist"); // Drop the tourist table
  await dropProcedures(knex); // Call the dropProcedures function to remove the stored procedures
};
