const express = require("express");
const reservationsController = require("../controllers/reservationsController");
const router = express.Router();

/*
    /reservaciones ES EL URL BASE
    ejemplo: https://dreamapi.azurewebsites.net/reservaciones/upcoming

    /reservaciones/ : GET -> devuelve todas las reservaciones
    /reservaciones/upcoming : GET -> devuelve todas las reservaciones futuras
    /reservaciones/1 : GET -> devuelve la reservacion con ID 1
    /reservaciones/ : POST -> crea una nueva reservacion
    /reservaciones/1 : PUT -> actualiza la reservacion con ID 1
    /reservaciones/stats : GET -> devuelve estadisticas de las reservaciones para el dashboard de administardor
*/

/**
 * @swagger
 * /reservaciones:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     description: Recupera una lista de todas las reservaciones que no están marcadas como eliminadas.
 *     responses:
 *       200:
 *         description: Un array de reservaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID de la reservación.
 *                   nombre:
 *                     type: string
 *                     description: El nombre asociado a la reservación.
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     description: La fecha de la reservación.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Reservaciones
 */
router.get("/", reservationsController.getAllReservations);

/**
 * @swagger
 * /reservaciones/upcoming:
 *   get:
 *     summary: Obtener las reservaciones futuras
 *     description: Recupera una lista de todas las reservaciones futuras.
 *     responses:
 *       200:
 *         description: Un array de reservaciones futuras.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: El ID de la reservación.
 *                   nombre:
 *                     type: string
 *                     description: El nombre asociado a la reservación.
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     description: La fecha de la reservación futura.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Reservaciones
 */
router.get("/upcoming", reservationsController.getUpcomingReservations);

/**
 * @swagger
 * /reservaciones/participantes/{id}:
 *   get:
 *     summary: Sacar los participantes de una reservación por el ID de la reservacion
 *     description: Saca los participantes de una reservación por el ID de la reservación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reservación a recuperar.
 *     responses:
 *       200:
 *         description: Un objeto de usuarios
 *         content:
 *           application/json:
 *       404:
 *         description: Reservación no encontrada.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos
 *     tags:
 *       - Reservaciones
 */
router.get(
  "/participantes/:id",
  reservationsController.getParticipantesByReservacionId
);

/**
 * @swagger
 * /reservaciones/participantes/{id}:
 *   get:
 *     summary: Sacar el hardware de una reservación por el ID de la reservacion
 *     description: Saca el nombre del hardware y su cantidad de una reservacion por el ID de la reservacion
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reservación a recuperar.
 *     responses:
 *       200:
 *         description: Un objeto de usuarios
 *         content:
 *           application/json:
 *       404:
 *         description: Reservación no encontrada.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos
 *     tags:
 *       - Reservaciones
 */
router.get("/hardware/:id", reservationsController.getHardwareByReservacionId);

/**
 * @swagger
 * /reservaciones/stats:
 *   get:
 *     summary: Obtener estadísticas de las reservaciones
 *     description: Sacar estadísticas de las reservaciones para el dashboard de administrador.
 *     responses:
 *       200:
 *         description: Estadísticas de las reservaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 iconStats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       icon:
 *                         type: string
 *                         description: Icono para la estadística.
 *                       count:
 *                         type: integer
 *                         description: Cantidad de reservaciones asociadas a la estadística.
 *                       label:
 *                         type: string
 *                         description: Etiqueta para la estadística.
 *       500:
 *         description: Server error or database connectivity issue.
 *     tags:
 *       - Reservaciones
 */
router.get("/stats", reservationsController.getReservationStats);

/**
 * @swagger
 * /reservaciones/{id}:
 *   get:
 *     summary: Sacar una reservacion por ID
 *     description: Recupera una reservación por su ID único.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reservación a recuperar.
 *     responses:
 *       200:
 *         description: Un objeto de reservación.
 *         content:
 *           application/json:
 *       404:
 *         description: Reservación no encontrada.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos
 *     tags:
 *       - Reservaciones
 */
router.get("/:id", reservationsController.getReservationById);

/**
 * @swagger
 * /reservaciones:
 *   post:
 *     summary: Crear una nueva reservación
 *     description: Agrega una nueva reservación a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReservation'
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Reservaciones
 * components:
 *   schemas:
 *     NewReservation:
 *       type: object
 *       required:
 *         - Matricula
 *         - SalaID
 *         - HoraInicio
 *         - HoraFin
 *         - Proposito
 *         - Estado
 *       properties:
 *         Matricula:
 *           type: string
 *           description: Matricula del estudiante.
 *         SalaID:
 *           type: integer
 *           description: Identificador de la sala reservada.
 *         HoraInicio:
 *           type: string
 *           format: date-time
 *           description: Tiempo de inicio de la reservación.
 *         HoraFin:
 *           type: string
 *           format: date-time
 *           description: Fin de la reservación.
 *         Proposito:
 *           type: string
 *           description: Prpósito de la reservación.
 *         Estado:
 *           type: string
 *           description: Estado de la reservación.
 */
router.post("/", reservationsController.createReservation);

/**
 * @swagger
 * /reservaciones/{id}:
 *   put:
 *     summary: Actualizar una reservación existente
 *     description: Actualiza una reservación existente en la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reservación a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReservation'
 *     responses:
 *       200:
 *         description: Reservación actualizada exitosamente.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Reservaciones
 * components:
 *   schemas:
 *     UpdateReservation:
 *       type: object
 *       properties:
 *         HoraInicio:
 *           type: string
 *           format: date-time
 *           description: Nuevo tiempo de inicio de la reservación
 *         HoraFin:
 *           type: string
 *           format: date-time
 *           description: Nuevo tiempo de fin de la reservación
 *         Proposito:
 *           type: string
 *           description: Nuevo propósito de la reservación
 *         Estado:
 *           type: string
 *           description: Nuevo estado de la reservación
 */
router.put("/:id", reservationsController.updateReservation);

/**
 * @swagger
 * /reservaciones/set-deleted/{id}:
 *   put:
 *     summary: Marcar una reservación como eliminada
 *     description: Marca una reservación como eliminada en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reservación a marcar como eliminada.
 *     responses:
 *       200:
 *         description: Reservación marcada como eliminada exitosamente.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Reservaciones
 */
router.put("/set-deleted/:id", reservationsController.setReservacionDeleted);

/**
 * @swagger
 * /reservaciones/{id}:
 *   delete:
 *     summary: Eliminar una reservación por ID
 *     description: Elimina una reservación por su ID único.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la reservación a eliminar.
 *     responses:
 *       200:
 *         description: Reservación eliminada exitosamente.
 *       500:
 *         description: Error del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Reservaciones
 */
router.delete("/:id", reservationsController.deleteReservation);

module.exports = router;
