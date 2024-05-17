// controllers/roomsController.js
const sql = require("mssql");
const config = require("../configs/config");

// Ruta: /rooms
// Todas las salas
const getAllRooms = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().execute("sp_GetAllSalas");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error con DB", error: err });
  }
};

const getRoomById = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .execute("sp_GetSalaById");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error con DB", error: err });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
};
