import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from
'react-router-dom'

import Login from './login'
import Home from './home'
import Preferencias from './preferencias'
import Cadastro from './cadastro'
// A tag de Redirect irá redirecionar qualquer chamada que não foi
// mapeada nas Routes para a rota especificada.

export default props => (
    <Router>
        <Route path='/login' component={Login} />
        <Redirect from='*' to='/login' />
        <Route path='/home' component={Home}/>
        <Route path='/preferencias' component={Preferencias}/>
        <Route path='/cadastro' component={Cadastro}/>

    </Router>
)