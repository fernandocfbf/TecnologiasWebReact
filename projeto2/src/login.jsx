import React, { Component } from 'react'
import axios from 'axios' //importando axios

export default class Login extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            lista: [
                { username: 'mrbrightside' },
                { username: 'jenny' }
            ], usuario: { nome: '' }
        }

        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3000/login')
            .then(resp => {
                console.log(resp)
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ lista: resp.data })
                    return;
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))

        this.handleChange = this.handleChange.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
    }

    cadastrar() {
        axios.post('http://localhost:3000/adduser', this.state.usuario).then(resp => {
            if (Math.floor(resp.status / 100) === 2) {
                this.setState((state) => {
                    return {
                        lista: [...state.lista, state.usuario],
                        usuario: { username: '' }
                    }
                })
                return;
            }
            console.log(resp)
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

        //usuarios é uma lista do state
        var usuarios = this.state.lista

        //recebe func -> for -> exect/porElemento
        var liUsuarios = usuarios.map(usuario => {
            return (
                <li key={usuario.username}>{usuario.username}</li>
            )
        })
        return (
            <div>

                <label>Username</label>
                <input name="username"
                    value={this.state.usuario.username}
                    onChange={this.handleChange} />
                <label>Senha</label>
                
                <input name="senha"
                    value={this.state.usuario.username}
                    onChange={this.handleChange}/>

                <button onClick={this.cadastrar}>Registrar</button>


            </div>
        )
    }
}
