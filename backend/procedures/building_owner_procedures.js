// procedures/building_owner.procedures.js

async function createProcedures(knex) {
  // Get All
  await knex.raw(`
    CREATE PROCEDURE GetAllBuildingOwner()
    BEGIN
      SELECT * FROM building_owner;
    END
  `);

  // Get By Id
  await knex.raw(`
    CREATE PROCEDURE GetBuildingOwnerById(IN p_bldg_owner_id INT)
    BEGIN
      SELECT *
      FROM building_owner
      WHERE bldg_owner_id = p_bldg_owner_id;
    END
  `);

  // Insert
  await knex.raw(`
    CREATE PROCEDURE InsertBuildingOwner(
      IN p_user_id INT,
      IN p_lastname VARCHAR(50),
      IN p_firstname VARCHAR(50),
      IN p_middlename VARCHAR(50),
      IN p_tin CHAR(9),
      IN p_id_submitted VARCHAR(20),
      IN p_id_issued_town_id INT,
      IN p_id_issued_date VARCHAR(10),
      IN p_id_number VARCHAR(20),
      IN p_detailed_address VARCHAR(100),
      IN p_barangay_id INT,
      IN p_email_add VARCHAR(100)
    )
    BEGIN
      INSERT INTO building_owner (
        user_id, lastname, firstname, middlename, tin, id_submitted,
        id_issued_town_id, id_issued_date, id_number, detailed_address,
        barangay_id, email_add
      ) VALUES (
        p_user_id, p_lastname, p_firstname, p_middlename, p_tin, p_id_submitted,
        p_id_issued_town_id, p_id_issued_date, p_id_number, p_detailed_address,
        p_barangay_id, p_email_add
      );
    END
  `);

  // Update (all fields optional)
  await knex.raw(`
    CREATE PROCEDURE UpdateBuildingOwner(
      IN p_bldg_owner_id INT,
      IN p_user_id INT,
      IN p_lastname VARCHAR(50),
      IN p_firstname VARCHAR(50),
      IN p_middlename VARCHAR(50),
      IN p_tin CHAR(9),
      IN p_id_submitted VARCHAR(20),
      IN p_id_issued_town_id INT,
      IN p_id_issued_date VARCHAR(10),
      IN p_id_number VARCHAR(20),
      IN p_detailed_address VARCHAR(100),
      IN p_barangay_id INT,
      IN p_email_add VARCHAR(100)
    )
    BEGIN
      UPDATE building_owner
      SET user_id = IFNULL(p_user_id, user_id),
          lastname = IFNULL(p_lastname, lastname),
          firstname = IFNULL(p_firstname, firstname),
          middlename = IFNULL(p_middlename, middlename),
          tin = IFNULL(p_tin, tin),
          id_submitted = IFNULL(p_id_submitted, id_submitted),
          id_issued_town_id = IFNULL(p_id_issued_town_id, id_issued_town_id),
          id_issued_date = IFNULL(p_id_issued_date, id_issued_date),
          id_number = IFNULL(p_id_number, id_number),
          detailed_address = IFNULL(p_detailed_address, detailed_address),
          barangay_id = IFNULL(p_barangay_id, barangay_id),
          email_add = IFNULL(p_email_add, email_add)
      WHERE bldg_owner_id = p_bldg_owner_id;
    END
  `);

  // Delete
  await knex.raw(`
    CREATE PROCEDURE DeleteBuildingOwner(IN p_bldg_owner_id INT)
    BEGIN
      DELETE FROM building_owner
      WHERE bldg_owner_id = p_bldg_owner_id;
    END
  `);
}

async function dropProcedures(knex) {
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllBuildingOwner");
  await knex.raw("DROP PROCEDURE IF EXISTS GetBuildingOwnerById");
  await knex.raw("DROP PROCEDURE IF EXISTS InsertBuildingOwner");
  await knex.raw("DROP PROCEDURE IF EXISTS UpdateBuildingOwner");
  await knex.raw("DROP PROCEDURE IF EXISTS DeleteBuildingOwner");
}

export { createProcedures, dropProcedures };
