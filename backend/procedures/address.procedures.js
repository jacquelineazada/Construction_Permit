async function createProcedures(knex) {
  // ========================
  // Province Procedures
  // ========================
  await knex.raw(`
    CREATE PROCEDURE GetAllProvince()
    BEGIN
      SELECT * FROM province;
    END;
  `);

  await knex.raw(`
    CREATE PROCEDURE GetProvinceById(IN p_province_id INT)
    BEGIN
      SELECT * FROM province WHERE province_id = p_province_id;
    END;
  `);

  // ========================
  // Town Procedures
  // ========================
  await knex.raw(`
    CREATE PROCEDURE GetAllTown()
    BEGIN
      SELECT * FROM town;
    END;
  `);

  await knex.raw(`
    CREATE PROCEDURE GetTownById(IN p_town_id INT)
    BEGIN
      SELECT * FROM town WHERE town_id = p_town_id;
    END;
  `);

  await knex.raw(`
    CREATE PROCEDURE GetTownsByProvinceId(IN p_province_id INT)
    BEGIN
      SELECT * FROM town WHERE province_id = p_province_id;
    END;
  `);

  // ========================
  // Barangay Procedures
  // ========================
  await knex.raw(`
    CREATE PROCEDURE GetAllBarangay()
    BEGIN
      SELECT * FROM barangay;
    END;
  `);

  await knex.raw(`
    CREATE PROCEDURE GetBarangayById(IN p_barangay_id INT)
    BEGIN
      SELECT * FROM barangay WHERE barangay_id = p_barangay_id;
    END;
  `);

  await knex.raw(`
    CREATE PROCEDURE GetBarangaysByTownId(IN p_town_id INT)
    BEGIN
      SELECT * FROM barangay WHERE town_id = p_town_id;
    END;
  `);
}

async function dropProcedures(knex) {
  // Province
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllProvince;");
  await knex.raw("DROP PROCEDURE IF EXISTS GetProvinceById;");

  // Town
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllTown;");
  await knex.raw("DROP PROCEDURE IF EXISTS GetTownById;");
  await knex.raw("DROP PROCEDURE IF EXISTS GetTownsByProvinceId;");

  // Barangay
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllBarangay;");
  await knex.raw("DROP PROCEDURE IF EXISTS GetBarangayById;");
  await knex.raw("DROP PROCEDURE IF EXISTS GetBarangaysByTownId;");
}

export { createProcedures, dropProcedures };
