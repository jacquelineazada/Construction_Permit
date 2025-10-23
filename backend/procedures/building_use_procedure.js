async function createProcedures(knex) {
  // Get All
  await knex.raw(`
    CREATE PROCEDURE GetAllBuildingUse()
    BEGIN
      SELECT * FROM building_use;
    END
  `);

  // Get By Id
  await knex.raw(`
    CREATE PROCEDURE GetBuildingUseById(IN p_bldg_use_id INT)
    BEGIN
      SELECT *
      FROM building_use
      WHERE bldg_use_id = p_bldg_use_id;
    END
  `);

  // Insert
  await knex.raw(`
    CREATE PROCEDURE InsertBuildingUse(
      IN p_bldg_use_id INT,
      IN p_bldg_use_desc VARCHAR(30),
      IN p_bldg_use_group_id INT,
      IN p_metadata JSON
    )
    BEGIN
      INSERT INTO building_use (bldg_use_id, bldg_use_desc, bldg_use_group_id, metadata)
      VALUES (p_bldg_use_id, p_bldg_use_desc, p_bldg_use_group_id, p_metadata);
    END
  `);

  // Update
  await knex.raw(`
    CREATE PROCEDURE UpdateBuildingUse(
      IN p_bldg_use_id INT,
      IN p_bldg_use_desc VARCHAR(30),
      IN p_bldg_use_group_id INT,
      IN p_metadata JSON
    )
    BEGIN
      UPDATE building_use
      SET bldg_use_desc = IFNULL(p_bldg_use_desc, bldg_use_desc),
          bldg_use_group_id = IFNULL(p_bldg_use_group_id, bldg_use_group_id),
          metadata = IFNULL(p_metadata, metadata)
      WHERE bldg_use_id = p_bldg_use_id;
    END
  `);

  // Delete
  await knex.raw(`
    CREATE PROCEDURE DeleteBuildingUse(IN p_bldg_use_id INT)
    BEGIN
      DELETE FROM building_use
      WHERE bldg_use_id = p_bldg_use_id;
    END
  `);
}

async function dropProcedures(knex) {
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllBuildingUse");
  await knex.raw("DROP PROCEDURE IF EXISTS GetBuildingUseById");
  await knex.raw("DROP PROCEDURE IF EXISTS InsertBuildingUse");
  await knex.raw("DROP PROCEDURE IF EXISTS UpdateBuildingUse");
  await knex.raw("DROP PROCEDURE IF EXISTS DeleteBuildingUse");
}

export { createProcedures, dropProcedures };
