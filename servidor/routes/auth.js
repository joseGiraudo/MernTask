// Rutas para auntenticar usuarios
const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// iniciar sesión
// api/auth ---> endpoint
router.post('/',
    
    authController.autenticarUsuario
);

// obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);
module.exports = router;