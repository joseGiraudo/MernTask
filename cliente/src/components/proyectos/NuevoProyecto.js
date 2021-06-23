import React, { Fragment, useContext, useState } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //state para proyecto
    const [proyecto, guardarProyecto] = useState ({
        nombre: ''
    });
    //Destructuring
    const { nombre } = proyecto;

    const onChangeProyecto = e => { //lee los contenidos del input
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }
    const onSubmitProyecto = e => { // cuando el usuario envia un proyecto
        e.preventDefault();

        // Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto);


        // reiniciar el form
        guardarProyecto({
            nombre:''
        })
    }


    return ( 
        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={ () => mostrarFormulario() }
             >Nuevo Proyecto</button>

            {
                formulario ?  // si formulario es true, lo muestra, y despues en el reducer (AGREGAR_PROYECTOS) 
                            // lo pasa a false
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}

                            />
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />

                        </form>
                    ) : null }
                
                { errorformulario ? <p className="mensaje error">El Nombre del Proyecto es Obligatorio</p> : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;