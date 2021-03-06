import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

//so pra testar :'(
export default class Cadastro extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario: [
                { name: '' ,
                username: 'fernandocfbf' ,
                email: '',
                senha: '123' ,
                redirectToReferrer: false,
                erro: '' 
               
            }
            ]
        }

        this.handleChange = this.handleChange.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
        
    }


    cadastrar() {
        axios.post('http://localhost:3000/adduser', {name: this.state.usuario.name, username: this.state.usuario.username, email: this.state.usuario.email, senha: this.state.usuario.senha})
        
                    const verifica = {
            
                            redirectToReferrer: true,
                            name: '',
                            username: '',
                            email: '',
                            senha: ''
                        
                    }
                    this.setState({ usuario: verifica })     
            
            return;
            

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

        console.log(this.state.usuario.redirectToReferrer)
        if (this.state.usuario.redirectToReferrer === true) {
            
            return (
                <Redirect to={{
                    pathname: "/cadastrado"
                }} />
            )
            }
            
           

        return (
            <div>

                <label>Nome: </label>
                <input name="name"
                    value={this.state.usuario.name}
                    onChange={this.handleChange} /><br></br>

                <label>Username: </label>
                <input name="username"
                    value={this.state.usuario.username}
                    onChange={this.handleChange} /><br></br>

                <label>E-mail: </label>
                <input name="email"
                    value={this.state.usuario.email}
                    onChange={this.handleChange} /><br></br>  

                <label>Senha: </label>
                <input name="senha"
                    value={this.state.usuario.senha}
                    onChange={this.handleChange} /><br></br>

                <button onClick={this.cadastrar}>Cadastrar</button>
            </div>
        )
    }
}
