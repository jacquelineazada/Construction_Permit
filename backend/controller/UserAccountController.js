import db from "../db.js";
import { handleDbError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt"; // or "bcrypt" depending on your package
import jwt from "jsonwebtoken";

// fetch all data
export async function getAllData(request, response) {
  try {
    const [data] = await db.query("CALL GetAllUserAccounts()");
    response.json(data[0]); // procedures return [rows, fields], rows[0] is actual data
  } catch (error) {
    handleDbError(error, response);
  }
}

// fetch data by ID
export async function getDataById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await db.query("CALL GetUserAccountById(?)", [id]);
    if (data[0].length === 0) {
      return response.status(404).json({ message: "Data not found" });
    }
    response.json(data[0][0]); // return single row
  } catch (error) {
    return handleDbError(error, response);
  }
}
// insert into table
export async function insertData(request, response) {
  try {
    const { id, username, user_password, user_type } = request.body;

    // hash the password before saving
    const hashedPassword = user_password
      ? await bcrypt.hash(user_password, 10) // 10 = salt rounds
      : null;

    const [data] = await db.query("CALL InsertUserAccount(?, ?, ?, ?)", [
      id,
      username,
      hashedPassword, // use hashed password
      user_type,
    ]);

    response.status(201).json({
      message: "user_account inserted successfully",
      data: data[0][0],
    });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// update data by ID
export async function updateData(request, response) {
  const { id } = request.params;
  try {
    const { username, user_user_password, user_type } = request.body;

    const [data] = await db.query("CALL UpdateUserAccount(?, ?, ?, ?)", [
      id,
      username ?? null,
      user_user_password ?? null,
      user_type ?? null,
    ]);

    if (data[0].length === 0) {
      return response.status(404).json({ message: "Data not found" });
    }

    response.json(data[0][0]); // updated record
  } catch (error) {
    return handleDbError(error, response);
  }
}

// delete data by ID
export async function deleteData(request, response) {
  const { id } = request.params;
  try {
    await db.query("CALL DeleteUserAccount(?)", [id]);
    response.json({ message: "Row deleted successfully" });
  } catch (error) {
    return handleDbError(error, response);
  }
}
// Login user
export async function loginUser(req, res) {
  const { username, user_password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM user_account WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        user_password: user.user_password,
        user_type: user.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        user_password: user.user_password,
        user_type: user.user_type,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
