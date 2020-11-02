import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class preferencias extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            id: this.props.location.state.id,
            nome: this.props.location.state.nome,
            preferencias: [],
            redirect: false
        }

        this.addPreferencias = this.addPreferencias.bind(this)
        this.confirma = this.confirma.bind(this)
    }


    addPreferencias(event) {
        console.log(this.state.preferencias)
        if (event.target.checked == true) {
            const addpreferencias = this.state.preferencias
            const caixaSelecionada = event.target.value

            addpreferencias.push(caixaSelecionada)
            this.setState({ username: addpreferencias });
        }

    }

    async confirma() {
        await axios.post('http://localhost:3000/preferencias', { nome: this.state.nome, preferencias: this.state.preferencias })
        this.setState({ redirect: true })
        console.log(this.state)
    }


render() {
    if (this.state.redirect == true) {
        console.log("ENTREI")
        return (
            <Redirect to={
                {
                    pathname: "/home",
                    state: {
                        id: this.state.id,
                        nome: this.state.nome,
                        preferencias: this.state.preferencias
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
