// controllers/miscController.js
const sql = require('mssql');
const config = require('../configs/config');

const connectToDB = async () => {
  try {
    await sql.connect(config);
    console.log("Connected to database");
    return true;  
  } catch (err) {
    console.error("Database connection failed:", err);
    return false;  
  }
};

//Ruta: /
const getRoot = (req, res) => {
  res.send("Ruta funcionando");
};

// Ruta: /test
const getTest = async (req, res) => {
  const isConnected = await connectToDB();
  if (isConnected) {
    res.status(200).send("Conectado a la base de datos");
  } else {
    res.status(500).send("No se ha podido conectar a la base de datos, intentando conectar");
  }
};

module.exports = {
  getRoot,
  getTest
};
