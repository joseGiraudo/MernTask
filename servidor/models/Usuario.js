const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true // MongoDB elimina los espacios al principio y al final
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // para que no haya dos iguales, es único
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro :{
        type: Date,
        default: Date.now() // genera una fecha en el momento que se hace el registro
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema); //modelo usuario con el Schema