const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    // revisar si hay errores (validation)
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // extraer el email y el password
    const { email, password } = req.body;

    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        // revisar el password
        const passCorrect = await bcryptjs.compare(password, usuario.password); 
        // compara el password que esta pasado como req con el de la BD
        if(!passCorrect) {
            return res.status(400).json({msg: 'Password incorrecto'});
        }

        // si todo es correcto        
        // crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 36000 // 10hs
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmacion
            res.json({ token: token });
        });

    } catch (error) {
        console.log(error);
    }
}

// obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}