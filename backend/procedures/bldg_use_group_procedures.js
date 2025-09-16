// procedures/bldg_use_group.procedures.js

async function createProcedures(knex) {
  // Get All
  await knex.raw(`
    CREATE PROCEDURE GetAllBldgUseGroup()
    BEGIN
      SELECT * FROM bldg_use_group;
    END
  `);

  // Get By Id
  await knex.raw(`
    CREATE PROCEDURE GetBldgUseGroupById(IN p_id INT)
    BEGIN
      SELECT *
      FROM bldg_use_group
      WHERE id = p_id;
    END
  `);

  // Insert
  await knex.raw(`
    CREATE PROCEDURE InsertBldgUseGroup(
      IN p_bldg_use_grp VARCHAR(255),
      IN p_bldg_use_grp_desc VARCHAR(255)
    )
    BEGIN
      INSERT INTO bldg_use_group (bldg_use_grp, bldg_use_grp_desc)
      VALUES (p_bldg_use_grp, p_bldg_use_grp_desc);
    END
  `);

  // Update
  await knex.raw(`
    CREATE PROCEDURE UpdateBldgUseGroup(
      IN p_id INT,
      IN p_bldg_use_grp VARCHAR(255),
      IN p_bldg_use_grp_desc VARCHAR(255)
    )
    BEGIN
      UPDATE bldg_use_group
      SET bldg_use_grp = IFNULL(p_bldg_use_grp, bldg_use_grp),
          bldg_use_grp_desc = IFNULL(p_bldg_use_grp_desc, bldg_use_grp_desc)
      WHERE id = p_id;
    END
  `);

  // Delete
  await knex.raw(`
    CREATE PROCEDURE DeleteBldgUseGroup(IN p_id INT)
    BEGIN
      DELETE FROM bldg_use_group
      WHERE id = p_id;
    END
  `);
}

async function dropProcedures(knex) {
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllBldgUseGroup");
  await knex.raw("DROP PROCEDURE IF EXISTS GetBldgUseGroupById");
  await knex.raw("DROP PROCEDURE IF EXISTS InsertBldgUseGroup");
  await knex.raw("DROP PROCEDURE IF EXISTS UpdateBldgUseGroup");
  await knex.raw("DROP PROCEDURE IF EXISTS DeleteBldgUseGroup");
}

export { createProcedures, dropProcedures };
