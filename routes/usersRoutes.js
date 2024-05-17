const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const ROLES_LIST = require("../configs/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { verify } = require("jsonwebtoken");

/* /usuarios ES EL URL BASE

    /usuarios/ : GET -> devuelve todos los usuarios
    /usuarios/:matricula : GET -> devuelve el usuario con matricula especifica
    /usuarios/ : POST -> crea un nuevo usuario
    /usuarios/registro : POST -> registra un nuevo usuario


*/

// server/routes/usersRoutes.js
router.put("/updaterole", usersController.updateUserRole);
router.get("/perfil/:matricula", usersController.getUserProfile);
router.get("/", usersController.getAllUsers);
router.get("/:matricula", usersController.getUserByMatricula);
router.post("/", usersController.createUser);
router.post("/registro", usersController.registerUser);
router.put("/:matricula", usersController.updateUser);

//router.get("/", verifyJWT, usersController.getAllUsers); Para que se necesite token para acceder
/*
router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
  usersController.getAllUsers
);
*/

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Saca todos los usuarios
 *     description: Recupera una lista de todos los usuarios registrados en la base de datos.
 *     responses:
 *       200:
 *         description: Un arreglo de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *
 *       500:
 *         description: Server error or database connectivity issue.
 *     tags:
 *       - Usuarios
 */
router.get("/", usersController.getAllUsers);

/**
 * @swagger
 * /usuarios/{matricula}:
 *   get:
 *     summary: Sacar un usuario por matricula
 *     description: Saca un usuario por su matricula.
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *         description: La matricula del usuario.
 *     responses:
 *       200:
 *         description: Un objeto de usuario
 *
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Usuarios
 */
router.get("/:matricula", usersController.getUserByMatricula);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con los datos de matricula, nombre, apellidos, contraseña, carrera y semestre.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Matricula
 *               - Nombre
 *               - Apellidos
 *               - Contraseña
 *               - Carrera
 *               - Semestre
 *             properties:
 *               Matricula:
 *                 type: string
 *                 description: ID único del usuario.
 *               Nombre:
 *                 type: string
 *                 description: Primer nombre del usuario.
 *               Apellidos:
 *                 type: string
 *                 description: Apellidos del usuario.
 *               Contraseña:
 *                 type: string
 *                 description: Password del usuario.
 *               Carrera:
 *                 type: string
 *                 description: Carrera del usuario.
 *               Semestre:
 *                 type: integer
 *                 description: Semestre en el que se encuentra el usuario.
 *     tags:
 *       - Usuarios
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       500:
 *         description: Error interno del servidor o problema de conectividad con la base de datos.
 */
router.post("/", usersController.createUser);

/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registrar un nuevo usuario con matricula y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Mala solicitud, usuario ya registrado.
 *       500:
 *         description: Error interno del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Usuarios
 */
router.post("/registro", usersController.registerUser);

/**
 * @swagger
 * /usuarios/auth:
 *   post:
 *     summary: Autenticar usuario
 *     description: Autenticar un usuario, proporcionar tokens de acceso y actualización.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: El usuario ha sido autenticado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: string
 *                   description: Roles of the user.
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token.
 *       401:
 *         description: Sin autorización, credenciales incorrectas.
 *       500:
 *         description: Error interno del servidor o problema de conectividad con la base de datos.
 *     tags:
 *       - Usuarios
 */
router.post("/auth", usersController.loginUser);

module.exports = router;
