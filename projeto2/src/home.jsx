import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            usuario:
            {
                id: this.props.location.state.id,
                nome: this.props.location.state.nome,
                preferencias: this.props.location.state.preferencias
            },
            produtos: [
                { price: '0.0', title: 'mrbrightside', link: "url", image: 'link' }

            ], produto: { title: '' }
            ,
            redirect: false
        }


        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3000/home')
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)

                    this.setState({ produtos: resp.data })

                    return;
                }

                //console.log(resp.data)
            })
            .catch(erro => console.log(erro))

        this.handleChange = this.handleChange.bind(this)
        this.modificaPreferencias = this.modificaPreferencias.bind(this)
    }



    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value
            return state
        }

        this.setState(handleState(this.state, event))
    }

    modificaPreferencias(){
        this.setState({ redirect: true })
    }
    render() {

        console.log(this.state)

        if(this.state.redirect === true){
            return (
                <Redirect to={
                    {
                        pathname: "/preferencias",
                        state: {
                            preferencias: this.state.usuario.preferencias,
                        }
                    }
                }
                />
            )
        }
        const preferencias_do_usuario = this.state.usuario.preferencias

        console.log("envia", this.state.usuario.nome)



        var produtos = this.state.produtos

        var liProdutos = produtos.map(produto => {
            return (

                <li key={produto.title}>{produto.title}, {produto.price}, "mais detalhes:" {produto.link},
                    <img src={produto.image}></img>
                </li>
            )
        })

        if (preferencias_do_usuario.length === 0) {
            return (
                <Redirect to={
                    {
                        pathname: "/preferencias",
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

                    <header>
                        <button onClick={this.modificaPreferencias}>Preferências</button>
                    </header>
                    <h1>
                        Você já tem preferencias
                </h1>




                    <ul> {liProdutos} </ul>

                </div>
            )



        }


    }
}