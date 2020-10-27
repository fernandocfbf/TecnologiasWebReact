import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from
'react-router-dom'

import Usuarios from './usuarios'
import Login from './login'
// A tag de Redirect irá redirecionar qualquer chamada que não foi
// mapeada nas Routes para a rota especificada.

export default props => (
    <Router>
        <Route path='/login' component={Login} />
        <Redirect from='*' to='/login' />
    </Router>
)