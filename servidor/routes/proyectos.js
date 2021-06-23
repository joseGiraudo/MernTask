const express = require('express');
const router = express.Router();
const proyectoControler = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea proyectos
// api/proyectos ---> endpoint

router.post('/',
    auth, // primero verifica, y una vez que pasa se va a crear el proyecto
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoControler.crearProyecto
);


// obtener todos los proyectos
router.get('/',
    auth, // revisar que el usuario esté autenticado
    proyectoControler.obtenerProyectos
);

//  actualizar un proyecto via id
router.put('/:id', // este :id significa un comodin 
    auth, // revisar que el usuario esté autenticado
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty() // validamos
    ],
    proyectoControler.actualizarProyecto
);

// eliminar un proyecto
router.delete('/:id', // este :id significa un comodin 
    auth, // revisar que el usuario esté autenticado
    proyectoControler.eliminarProyecto
);


module.exports = router;