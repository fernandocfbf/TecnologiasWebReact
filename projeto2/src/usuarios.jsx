import React, { Component } from 'react'
import axios from 'axios' //importando axios

export default class Usuarios extends Component {
    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {
            lista: [
                { username: 'mrbrightside' },
                { username: 'jenny' }
            ], usuario: { nome: '' }
        }
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3000/userlist')
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ lista: resp })
                    return;
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))

        this.handleChange = this.handleChange.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
    }

    render() {
        var usuarios = this.state.lista
        var liUsuarios = usuarios.map(usuario => {
            return (
                <li key={usuario.username}>{usuario.username}</li>
            )
        })
        return (
            <div>
                <ul> {liUsuarios} </ul>
                <ul>
                    <li>
                        <label>Username</label>
                        <input name="username"
                            value={this.state.usuario.username}
                            onChange={this.handleChange} />
                    </li>
                    <li>
                        <button onClick={this.cadastrar}>Registrar</button>
                    </li>
                </ul>
            </div>
        )
    }
