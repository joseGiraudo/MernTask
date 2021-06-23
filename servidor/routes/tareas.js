const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear una tarea
// api/tareas
router.post('/',
    auth, // middleware de autenticacion
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],

    tareaController.crearTarea
);

// obtener las tareas por proyecto
router.get('/',
    auth, // middleware de autenticacion
    tareaController.obtenerTareas
);

// actualizar una tarea
router.put('/:id',
    auth, // middleware de autenticacion
    tareaController.actualizarTarea
);

// eliminar una tarea
router.delete('/:id',
    auth, // middleware de autenticacion
    tareaController.eliminarTarea
);



module.exports = router;