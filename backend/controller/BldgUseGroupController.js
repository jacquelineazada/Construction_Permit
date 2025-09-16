// controller/BldgUseGroupController.js
import db from "../db.js";
import { handleDbError } from "../utils/errorHandler.js";

// fetch all data
export async function getAllData(request, response) {
  try {
    const [data] = await db.query("CALL GetAllBldgUseGroup()");
    response.json(data[0]); // CALL returns nested arrays
  } catch (error) {
    handleDbError(error, response);
  }
}

// fetch data by ID
export async function getDataById(request, response) {
  const { id } = request.params;
  try {
    const [data] = await db.query("CALL GetBldgUseGroupById(?)", [id]);
    if (data[0].length === 0) {
      return response.status(404).json({ message: "Data not found" });
    }
    response.json(data[0][0]);
  } catch (error) {
    return handleDbError(error, response);
  }
}

// insert into table
export async function insertData(request, response) {
  const { bldg_use_grp, bldg_use_grp_desc } = request.body;
  try {
    await db.query("CALL InsertBldgUseGroup(?, ?)", [
      bldg_use_grp,
      bldg_use_grp_desc,
    ]);

    // fetch last inserted row
    const [newData] = await db.query(
      "SELECT * FROM bldg_use_group ORDER BY id DESC LIMIT 1"
    );

    response.json(newData[0]);
  } catch (error) {
    return handleDbError(error, response);
  }
}

// update data by ID
export async function updateData(request, response) {
  const { id } = request.params;
  const { bldg_use_grp, bldg_use_grp_desc } = request.body;
  try {
    await db.query("CALL UpdateBldgUseGroup(?, ?, ?)", [
      id,
      bldg_use_grp,
      bldg_use_grp_desc,
    ]);

    const [updated] = await db.query(
      "SELECT * FROM bldg_use_group WHERE id = ?",
      [id]
    );

    if (updated.length === 0) {
      return response.status(404).json({ message: "Data not found" });
    }

    response.json(updated[0]);
  } catch (error) {
    return handleDbError(error, response);
  }
}

// delete data by ID
export async function deleteData(request, response) {
  const { id } = request.params;
  try {
    await db.query("CALL DeleteBldgUseGroup(?)", [id]);
    response.json({ message: "Row deleted successfully" });
  } catch (error) {
    return handleDbError(error, response);
  }
}
