const express = require("express");
const roomsController = require("../controllers/salasController");
const router = express.Router();

/*  /salas ES EL URL BASE
    
        /salas/ : GET -> devuelve todas las salas


        Rutas que faltan por hacer:
        /salas/ : POST -> crea una nueva sala
        /salas/1 : PUT -> actualiza la sala con ID 1
        /salas/1 : DELETE -> borra la sala con ID 1
        /salas/1/reservaciones : GET -> devuelve todas las reservaciones de la sala con ID 1

*/


/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Sacar todas las salas
 *     description: Recupera una lista de todas las salas en el DREAM Lab.
 *     responses:
 *       200:
 *         description: Un arreglo de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID de la sala.
 *                   name:
 *                     type: string
 *                     description: El nombre de la sala.
 *                   capacity:
 *                     type: integer
 *                     description: La capacidad de la sala.
 *                   
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Salas
 */
router.get('/', roomsController.getAllRooms);


/**
 * @swagger
 * /salas/{id}:
 *   get:
 *     summary: Sacar una sala
 *     description: Recupera una sala por su ID único.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la sala a recuperar.
 *     responses:
 *       200:
 *         description: Un objeto de sala.
 *         content:
 *           application/json:
 *       404:
 *         description: Sala no encontrada.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos
 *     tags:
 *       - Salas
 */
router.get("/:id", roomsController.getRoomById);



module.exports = router;
