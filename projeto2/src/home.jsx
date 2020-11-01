import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario: [
                {
                    id: this.props.location.state.id,
                    nome: this.props.location.state.nome,
                    preferencias: this.props.location.state.preferencias
                }
            ],
            redirect: false
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
        const preferencias_do_usuario = this.state.usuario[0].preferencias

        if (preferencias_do_usuario.length === 0) {
            return (
                <Redirect to={
                    {
                        pathname: "/preferencias",
                        state: {
                            id: this.state.usuario.id,
                            nome: this.state.usuario.nome,
                        }
                    }
                }
                />
            )
        } else {
            return (
                <h1>
                    Você já tem preferencias
                </h1>
            )

        }




    }
}