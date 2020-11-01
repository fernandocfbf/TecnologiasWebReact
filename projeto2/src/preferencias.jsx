import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class preferencias extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario: [
                {
                    id: this.props.location.state.id,
                    nome: this.props.location.state.nome,
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value
            return state
        }

        this.setState(handleState(this.state, event))
    }

    render() {
            return (
                <h1>Bem vindo a página de preferencias</h1>
            )
    }
}
