import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    // extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

    // extraer el context de alertas
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // obtener proyectos cuando carga el componente
    useEffect(() => {

        // si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categria)
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    // ver si hay proyectos ya creados
    if(proyectos.length === 0 ) return <p>No hay Proyectos, crea uno</p>;



    return ( 

        <ul className="listado-proyectos">

            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) 
                : null}

            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key= {proyecto._id}
                        timeout={400}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;