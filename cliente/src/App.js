import React from 'react';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Dentro del Switch, van cada una de las diferentes paginas
// Lo que esté fuera del Switch (dentro del Router), es lo que se ve en todas las pag

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

// revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}


function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>

            <Router>
              <Switch> 
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>

            </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
