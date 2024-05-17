const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DREAM API',
      version: '1.0.0',
      description: 'Un api creado para el DREAM Lab'
    },
  },
  apis: ['./routes/*.js'], 
};

const openapiSpecification = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

/**
 * @swagger
 * components:
 *   schemas:
 * *     User:
 *       type: object
 *       properties:
 *         Matricula:
 *           type: string
 *           description: Registration number of the user.
 *         Nombre:
 *           type: string
 *           description: First name of the user.
 *         Apellidos:
 *           type: string
 *           description: Last name of the user.
 *         Carrera:
 *           type: string
 *           description: Career or major of the user.
 *         Semestre:
 *           type: integer
 *           description: Current semester of the user.
 *      
 *     NewUser:
 *       type: object
 *       properties:
 * 
 *     Registration:
 *       type: object
 *       properties:
 *         Matricula:
 *           type: string
 *           description: Registration number of the user.
 *         Contrasena:
 *           type: string
 *           description: Password of the user.
 *     Login:
 *       type: object
 *       properties:
 *         Matricula:
 *           type: string
 *           description: Registration number of the user.
 *         Contrasena:
 *           type: string
 *           description: Password of the user.
 *     Reservation:
 *       type: object
 *       required:
 *         - ReservacionID
 *         - HoraInicio
 *         - HoraFin
 *       properties:
 *         ReservacionID:
 *           type: integer
 *           description: Unique identifier of the reservation.
 *         Matricula:
 *           type: string
 *           maxLength: 10
 *           description: Registration number of the user who made the reservation.
 *         ZonaID:
 *           type: integer
 *           description: Identifier of the zone where the reservation is made.
 *         HoraInicio:
 *           type: string
 *           format: date-time
 *           description: Start time of the reservation.
 *         HoraFin:
 *           type: string
 *           format: date-time
 *           description: End time of the reservation.
 *         Proposito:
 *           type: string
 *           maxLength: 255
 *           description: Purpose of the reservation.
 *         Estado:
 *           type: string
 *           maxLength: 50
 *           description: Current state of the reservation.
 *         isDeleted:
 *           type: boolean
 *           description: Flag indicating whether the reservation is marked as deleted.
 */


module.exports = setupSwagger;
