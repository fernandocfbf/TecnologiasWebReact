import React, { Component } from 'react'
import axios from 'axios' //importando axios

export default class Login extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario: [
                { nome: '' },
                { username: 'fernandocfbf' },
                { senha: '123' },
                { erro: '' }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
        //this.cadastrar = this.cadastrar.bind(this)
        this.entrar = this.entrar.bind(this)
    }


    entrar() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3000/login', {username: this.state.usuario.username, senha: this.state.usuario.senha})
            .then(resp => {
                console.log(resp.data)
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ usuario: resp })


                    return;
                }
            })
            .catch(erro => console.log(erro))
    }

    // event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do nome)
    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value
            return state
        }

        this.setState(handleState(this.state, event))
    }

    render() {
        return (
            <div>

                <label>Username: </label>
                <input name="username"
                    value={this.state.usuario.username}
                    onChange={this.handleChange} /><br></br>
                <label>Senha: </label>
                <input name="senha"
                    value={this.state.usuario.senha}
                    onChange={this.handleChange} /><br></br>

                <button onClick={this.entrar}>Entrar</button>
            </div>
        )
    }
}
