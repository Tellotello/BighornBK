const express = require("express");
const hardwareController = require("../controllers/hardwareController");
const router = express.Router();

/*  /hardware ES EL URL BASE

        /hardware/ : GET -> devuelve todas las salas


        Rutas que faltan por hacer:
        /hardware/ : POST -> crea una nueva sala
        /hardware/1 : PUT -> actualiza la sala con ID 1
        /hardware/1 : DELETE -> borra la sala con ID 1
        /hardware/1/reservaciones : GET -> devuelve todas las reservaciones de la sala con ID 1

*/

/**
 * @swagger
 * /hardware:
 *   get:
 *     summary: Obtener todo el hardware
 *     description: Recupera una lista de todo el hardware registrado en la base de datos que no está marcado como eliminado.
 *     responses:
 *       200:
 *         description: Un array de hardware.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID del hardware.
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     description: El nombre del hardware.
 *                     example: "Impresora 3D"
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Hardware
 */
router.get("/", hardwareController.getAllHardware);

module.exports = router;
