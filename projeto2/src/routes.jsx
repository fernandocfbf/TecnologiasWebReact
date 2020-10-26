import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from
'react-router-dom'

import Usuarios from './usuarios'
// A tag de Redirect irá redirecionar qualquer chamada que não foi
// mapeada nas Routes para a rota especificada.

export default props => (
    <Router>
        <Route path='/usuarios' component={Usuarios} />
        <Redirect from='*' to='/usuarios' />
    </Router>
)