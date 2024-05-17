const sql = require("mssql");
const config = require("../configs/config");

// Ruta: /hardware
// Todos los hardware

const getAllHardware = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("sp_GetAllHardware");
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = {
  getAllHardware,
};
