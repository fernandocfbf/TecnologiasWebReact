import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'


export default class Cadastrado extends Component {
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
        this.fazerLogin = this.fazerLogin.bind(this)
        
        
    }

    fazerLogin(){
        const verifica = {
            
            redirectToReferrer: true,
            
        }
        this.setState({ usuario: verifica })
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

        
        if (this.state.usuario.redirectToReferrer === true) {
            
            return (
                <Redirect to={{
                    pathname: "/login"
                }} />
            )
            }
            
           

        return (
            <div>

                <h1>
                    Parabéns! Você está Cadastrado
                    Faça login e confira os produtos de sua preferência:

                </h1>

                <button onClick={this.fazerLogin}>Fazer Login</button>
                
            </div>
        )
    }
}
