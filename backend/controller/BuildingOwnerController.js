// controllers/building_owner.controller.js
import db from "../db.js";
import { handleDbError } from "../utils/errorHandler.js";

// fetch all building owners
export async function getAllBuildingOwners(request, response) {
  try {
    const [data] = await db.query("CALL GetAllBuildingOwner()");
    response.json(data[0]); // stored procedure returns array inside array
  } catch (error) {
    handleDbError(error, response);
  }
}

// fetch building owner by ID
export async function getBuildingOwnerById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await db.query("CALL GetBuildingOwnerById(?)", [id]);

    if (!data[0] || data[0].length === 0) {
      return response.status(404).json({ message: "Building owner not found" });
    }

    response.json(data[0][0]);
  } catch (error) {
    return handleDbError(error, response);
  }
}

// insert building owner
export async function insertBuildingOwner(request, response) {
  try {
    const {
      user_id,
      lastname,
      firstname,
      middlename,
      tin,
      id_submitted,
      id_issued_town_id,
      id_issued_date,
      id_number,
      detailed_address,
      barangay_id,
      email_add,
    } = request.body;

    await db.query(
      "CALL InsertBuildingOwner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        lastname,
        firstname,
        middlename,
        tin,
        id_submitted,
        id_issued_town_id,
        id_issued_date,
        id_number,
        detailed_address,
        barangay_id,
        email_add,
      ]
    );

    response.json({ message: "Building owner inserted successfully" });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// update building owner (all fields optional)
export async function updateBuildingOwner(request, response) {
  const { id } = request.params;
  try {
    const {
      user_id,
      lastname,
      firstname,
      middlename,
      tin,
      id_submitted,
      id_issued_town_id,
      id_issued_date,
      id_number,
      detailed_address,
      barangay_id,
      email_add,
    } = request.body;

    const [result] = await db.query(
      "CALL UpdateBuildingOwner(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        user_id ?? null,
        lastname ?? null,
        firstname ?? null,
        middlename ?? null,
        tin ?? null,
        id_submitted ?? null,
        id_issued_town_id ?? null,
        id_issued_date ?? null,
        id_number ?? null,
        detailed_address ?? null,
        barangay_id ?? null,
        email_add ?? null,
      ]
    );

    if (result.affectedRows === 0) {
      return response.status(404).json({ message: "Building owner not found" });
    }

    response.json({ message: "Building owner updated successfully" });
  } catch (error) {
    return handleDbError(error, response);
  }
}

// delete building owner
export async function deleteBuildingOwner(request, response) {
  const { id } = request.params;
  try {
    const [result] = await db.query("CALL DeleteBuildingOwner(?)", [id]);

    if (result.affectedRows === 0) {
      return response.status(404).json({ message: "Building owner not found" });
    }

    response.json({ message: "Building owner deleted successfully" });
  } catch (error) {
    return handleDbError(error, response);
  }
}
