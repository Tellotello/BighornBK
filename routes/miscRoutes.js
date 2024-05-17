// routes/miscRoutes.js
const express = require('express');
const miscController = require('../controllers/miscController');
const router = express.Router();

// Ruta: /
/**
 * @swagger
 * /:
 *   get:
 *     summary: Ruta de prueba
 *     description: Verifica si el servidor está funcionando.
 *     responses:
 *       200:
 *         description: Ruta funcionando correctamente.
 *       500:
 *         description: Error.
 *     tags:
 *       - Misceláneo
 */
router.get('/', miscController.getRoot);

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Ruta de prueba
 *     description: Intenta conectar a la base de datos
 *     responses:
 *       200:
 *         description: Conectado a la base de datos.
 *       500:
 *         description: Error.
 *     tags:
 *       - Misceláneo
 */
router.get('/test', miscController.getTest);


module.exports = router;
