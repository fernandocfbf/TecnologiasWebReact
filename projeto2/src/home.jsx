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
                { price: '0.0', title: 'mrbrightside', link: "url", image: 'link', pontuacao: '12', desconto: '0' }

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
        this.ordenar = this.ordenar.bind(this)
    }



    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value
            return state
        }

        this.setState(handleState(this.state, event))
    }

    ordenar(event) {
        console.log("STATE", this.state)
        console.log("VALOR", event.target.value)

        function preco(a, b) {
            return (a.price - b.price) //faz com que o array seja ordenado numericamente e de ordem crescente.
        }

        function avaliacao(a, b) {
            return (a.pontuacao - b.pontuacao) //faz com que o array seja ordenado numericamente e de ordem crescente.
        }

        function desconto(a, b) {
            return (a.desconto - b.desconto) //faz com que o array seja ordenado numericamente e de ordem crescente.
        }

        if (event.target.value === 'menorPreco') {
            var ordenado = this.state.produtos.sort(preco)

            this.setState({ produtos: ordenado })

        } else if (event.target.value === 'melhorAvaliacao') {
            var ordenado = this.state.produtos.sort(avaliacao).reverse()

            this.setState({ produtos: ordenado })

        } else if (event.target.value === 'maiorDesconto') {
            var ordenado = this.state.produtos.sort(desconto).reverse()

            this.setState({ produtos: ordenado })

        } else if (event.target.value === 'maiorPreco') {
            var ordenado = this.state.produtos.sort(preco).reverse()

            this.setState({ produtos: ordenado })

        }

    }

    modificaPreferencias() {
        this.setState({ redirect: true })
    }
    render() {

        if (this.state.redirect === true) {
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

        var produtos = this.state.produtos

        var liProdutos = produtos.map(produto => {
            return (

                <li key={produto.title}>
                    <table style={{width:'40%'}}>
                        <tr>
                            <img src={produto.image}></img>
                        </tr>
                        <tr>
                            {produto.title}
                        </tr>
                        <tr>
                            Preço: U${produto.price}
                        </tr>
                        <tr>
                            Mais detalhes: {produto.link}
                        </tr>

                    </table>
                </li >
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

                    <select onChange={this.ordenar} name="options">
                        <option selected >Escolha um cliente</option>
                        <option value='menorPreco'>Menor preço</option>
                        <option value='maiorPreco'>Maior preço</option>
                        <option value='melhorAvaliacao'>Melhores avaliados</option>
                        <option value='maiorDesconto'>Melhores descontos</option>

                    </select>

                    <ul style={{display:'flex', width:'100%'}}> {liProdutos} </ul>
                </div>
            )



        }


    }
}