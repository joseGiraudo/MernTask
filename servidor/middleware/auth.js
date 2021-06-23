const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    // leer el token del header
    const token = req.header('x-auth-token');
    //console.log(token);

    // revisar si no hay token
    if(!token) {
        return res.status(401).json( { msg: 'No hay Token, permiso No Válido' } )
    }

    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next(); // para que vaya al siguiente middleware
    } catch (error) {
        res.status(401).json( { msg: 'Token No Válido' } )
    }
}