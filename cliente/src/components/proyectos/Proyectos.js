import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';


const Proyectos = () => {

    // extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return ( 
        <div className="contenedor-app">
            
            <Sidebar />
            
            <div className="seccion-principal">
                
                <Topbar />

                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>

                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;