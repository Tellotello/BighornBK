const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Cerrar sesión de un usuario
 *     description: Limpia la cookie del token de actualización para cerrar la sesión del usuario.
 *     responses:
 *       204:
 *         description: Sin contenido, cierre de sesión exitoso y cookie eliminada.
 *       400:
 *         description: Solicitud incorrecta, no hay cookie JWT para limpiar.
 *       500:
 *         description: Error interno del servidor, problema con la conexión o ejecución de la base de datos.
 *     security:
 *       - cookieAuth: []
 *     tags: 
 *       - Autenticación
 */
router.get("/", logoutController.handleLogout);


module.exports = router;
