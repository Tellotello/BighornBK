const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshtokenController");


/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Actualizar el token de acceso
 *     description: Valida el token de actualización desde las cookies y emite un nuevo token de acceso.
 *     responses:
 *       200:
 *         description: Se ha creado y devuelto exitosamente un nuevo token de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: integer
 *                   description: El ID de rol del usuario.
 *                 accessToken:
 *                   type: string
 *                   description: El token de acceso recién generado.
 *       401:
 *         description: No autorizado, no se proporcionó la cookie del token de actualización.
 *       403:
 *         description: Prohibido, el token de actualización no es válido o ha expirado.
 *       500:
 *         description: Error interno del servidor, problema con la conectividad o ejecución de la base de datos.
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Autenticación
 */
router.get("/", refreshTokenController.handleRefreshToken);



module.exports = router;
