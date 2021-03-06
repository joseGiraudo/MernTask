import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    // extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext; // proyecto es el array que tiene cual es el proyecto seleccionado
    
    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas,
        actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada para editar
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    // state del formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })
    // extraer el nombre del proyecto (destructuring)
    const { nombre } = tarea;


    // si no hay proyecto seleccionado (no retorno el form)
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // 
    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '' ) {
            validarTarea();
            return;
        }
        // pasar la validacion (hecho en el reducer)

        // revisar si es edicion o nueva tarea
        if(tareaseleccionada === null) {
            // agregar la nueva tarea al state
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);
            // elimina la tareaseleccionada del state
            limpiarTarea();
        }        
        // obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);
        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
        
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;