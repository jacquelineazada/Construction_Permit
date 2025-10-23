import db from "../db.js";
import { handleDbError } from "../utils/errorHandler.js";

export async function getAllBuildingUse(req, res) {
  try {
    const [data] = await db.query("CALL GetAllBuildingUse()");
    res.json(data[0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function getBuildingUseById(req, res) {
  const { id } = req.params;
  try {
    const [data] = await db.query("CALL GetBuildingUseById(?)", [id]);

    if (data[0].length === 0) {
      return res.status(404).json({ message: "Building Use record not found" });
    }

    res.json(data[0][0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function createBuildingUse(req, res) {
  const { bldg_use_id, bldg_use_desc, bldg_use_group_id, metadata } = req.body;

  const metadataString = metadata ? JSON.stringify(metadata) : null;

  try {
    await db.query("CALL InsertBuildingUse(?, ?, ?, ?)", [
      bldg_use_id,
      bldg_use_desc,
      bldg_use_group_id,
      metadataString,
    ]);

    res.status(201).json({
      message: "Building Use record created successfully",
      id: bldg_use_id,
    });
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function updateBuildingUse(req, res) {
  const { id } = req.params;
  const { bldg_use_desc, bldg_use_group_id, metadata } = req.body;

  const metadataString = metadata ? JSON.stringify(metadata) : null;

  try {
    const [data] = await db.query("CALL UpdateBuildingUse(?, ?, ?, ?)", [
      id,
      bldg_use_desc,
      bldg_use_group_id,
      metadataString,
    ]);

    res.json({
      message: `Building Use record with ID ${id} updated successfully`,
    });
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function deleteBuildingUse(req, res) {
  const { id } = req.params;
  try {
    await db.query("CALL DeleteBuildingUse(?)", [id]);

    res.json({
      message: `Building Use record with ID ${id} deleted successfully`,
    });
  } catch (error) {
    handleDbError(error, res);
  }
}
