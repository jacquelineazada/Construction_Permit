import db from "../db.js";
import { handleDbError } from "../utils/errorHandler.js";

//
// ========================
// Province Controllers
// ========================
export async function getAllProvinces(req, res) {
  try {
    const [data] = await db.query("CALL GetAllProvince()");
    res.json(data[0]); // stored procedure results are nested
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function getProvinceById(req, res) {
  const { id } = req.params;
  try {
    const [data] = await db.query("CALL GetProvinceById(?)", [id]);
    if (data[0].length === 0) {
      return res.status(404).json({ message: "Province not found" });
    }
    res.json(data[0][0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

//
// ========================
// Town Controllers
// ========================
export async function getAllTowns(req, res) {
  try {
    const [data] = await db.query("CALL GetAllTown()");
    res.json(data[0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function getTownById(req, res) {
  const { id } = req.params;
  try {
    const [data] = await db.query("CALL GetTownById(?)", [id]);
    if (data[0].length === 0) {
      return res.status(404).json({ message: "Town not found" });
    }
    res.json(data[0][0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function getTownsByProvinceId(req, res) {
  const { provinceId } = req.params;
  try {
    const [data] = await db.query("CALL GetTownsByProvinceId(?)", [provinceId]);
    res.json(data[0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

//
// ========================
// Barangay Controllers
// ========================
export async function getAllBarangays(req, res) {
  try {
    const [data] = await db.query("CALL GetAllBarangay()");
    res.json(data[0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function getBarangayById(req, res) {
  const { id } = req.params;
  try {
    const [data] = await db.query("CALL GetBarangayById(?)", [id]);
    if (data[0].length === 0) {
      return res.status(404).json({ message: "Barangay not found" });
    }
    res.json(data[0][0]);
  } catch (error) {
    handleDbError(error, res);
  }
}

export async function getBarangaysByTownId(req, res) {
  const { townId } = req.params;
  try {
    const [data] = await db.query("CALL GetBarangaysByTownId(?)", [townId]);
    res.json(data[0]);
  } catch (error) {
    handleDbError(error, res);
  }
}
