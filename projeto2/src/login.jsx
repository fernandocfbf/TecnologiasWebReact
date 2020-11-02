import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'


export default class Login extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario: [
                {
                    nome: '',
                    id: '',
                    username: 'fernandocfbf',
                    nome: '',
                    senha: '123',
                    redirect: false,
                    redirectToCad: false,
                    erro: '',
                    preferencias: []
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
        this.cadastre = this.cadastre.bind(this)
        this.entrar = this.entrar.bind(this)
    }


    entrar() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3000/login', { username: this.state.usuario.username, senha: this.state.usuario.senha })
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ usuario: resp })
                    if (resp.data.length === 1) 

                        var consertado = resp.data[0]

                        const json = {
                            id: consertado._id,
                            redirect: true,
                            preferencias: consertado.preferencias,
                            nome: consertado.username
                        }
                        this.setState({ usuario: json })

                        return;
                    } else {
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

    cadastre(){
        const verifica = {
            
            redirectToCad: true,
            
        }
        this.setState({ usuario: verifica })
    }

    render() {

        if (this.state.usuario.redirect === true) {
            return (
                <Redirect to={{
                    pathname: "/home",
                    state: {
                        id: this.state.usuario.id,
                        nome: this.state.usuario.nome,
                        preferencias: this.state.usuario.preferencias
                    }
                }} />
            )
        }

        if (this.state.usuario.redirectToCad === true) {
            return (
                <Redirect to={{
                    pathname: "/cadastro"
                    
                }} />
            )
        }



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
                <button onClick={this.cadastre}>Cadastre-se</button>

            </div>
        )
    }
}
