import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class preferencias extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario:
            {
                id: this.props.location.state.id,
                nome: this.props.location.state.nome,
                preferencias: []
            },
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.addPreferencias = this.addPreferencias.bind(this)
        this.confirma = this.confirma.bind(this)
    }


    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value
            return state
        }

        this.setState(handleState(this.state, event))
    }

    addPreferencias(event) {
        console.log(this.state.usuario.preferencias)
        if (event.target.checked == true) {
            const addpreferencias = this.state.usuario.preferencias
            const caixaSelecionada = event.target.value

            addpreferencias.push(caixaSelecionada)

            const json = { preferencias: addpreferencias }
            this.setState({ usuario: json });
        }

    }

    confirma() {
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect === true) {
            return (
                <Redirect to={
                    {
                        pathname: "/home",
                        state: {
                            id: this.state.usuario.id,
                            nome: this.state.usuario.nome,
                            preferencias: this.state.usuario.preferencias
                        }
                    }
                }
                />
            )

        } else {
            return (
                <div>
                    <h1>Bem-vindo</h1>
                    <p>Escolha algumas das opções abaixo para uma melhor experiência</p>


                    eletrônicos<input onChange={this.addPreferencias} type="checkbox" value="eletronicos"></input><br></br>
                    moda<input onChange={this.addPreferencias} type="checkbox" value="moda"></input><br></br>
                    acessórios<input onChange={this.addPreferencias} type="checkbox" value="acessorios"></input><br></br>
                    calçados<input onChange={this.addPreferencias} type="checkbox" value="calcados"></input><br></br>

                    <button onClick={this.confirma}>Confirmar</button>
                </div>
            )
        }
    }
}
