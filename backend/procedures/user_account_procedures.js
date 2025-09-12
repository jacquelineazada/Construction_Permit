async function createProcedures(knex) {
  // Get all user_accounts
  await knex.raw(`
    CREATE PROCEDURE GetAllUserAccounts()
    BEGIN
      SELECT * FROM user_account;
    END;
  `);

  // Get user_account by ID
  await knex.raw(`
    CREATE PROCEDURE GetUserAccountById(IN p_id CHAR(36))
    BEGIN
      SELECT * FROM user_account WHERE id = p_id;
    END;
  `);

  // Insert user_account
  await knex.raw(`
    CREATE PROCEDURE InsertUserAccount(
      IN p_id CHAR(36),
      IN p_username VARCHAR(40),
      IN p_user_password TEXT,
      IN p_user_type ENUM('0','1')
    )
    BEGIN
      INSERT INTO user_account (
        id, username, user_password, user_type
      ) VALUES (
        p_id, p_username, p_user_password, p_user_type
      );

      SELECT * FROM user_account WHERE id = p_id;
    END;
  `);

  // Update user_account
  await knex.raw(`
    CREATE PROCEDURE UpdateUserAccount(
      IN p_id CHAR(36),
      IN p_username VARCHAR(40),
      IN p_user_password TEXT,
      IN p_user_type ENUM('0','1')
    )
    BEGIN
      UPDATE user_account
      SET username = IFNULL(p_username, username),
          user_password = IFNULL(p_user_password, user_password),
          user_type = IFNULL(p_user_type, user_type)
      WHERE id = p_id;

      SELECT * FROM user_account WHERE id = p_id;
    END;
  `);

  // Delete user_account
  await knex.raw(`
    CREATE PROCEDURE DeleteUserAccount(IN p_id CHAR(36))
    BEGIN
      DELETE FROM user_account WHERE id = p_id;
    END;
  `);
}

async function dropProcedures(knex) {
  await knex.raw("DROP PROCEDURE IF EXISTS GetAllUserAccounts;");
  await knex.raw("DROP PROCEDURE IF EXISTS GetUserAccountById;");
  await knex.raw("DROP PROCEDURE IF EXISTS InsertUserAccount;");
  await knex.raw("DROP PROCEDURE IF EXISTS UpdateUserAccount;");
  await knex.raw("DROP PROCEDURE IF EXISTS DeleteUserAccount;");
}

export { createProcedures, dropProcedures };
