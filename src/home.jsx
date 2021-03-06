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
                { price: '0.0', title: 'mrbrightside', link: "url", image: 'link', pontuacao: '12', desconto: '0', id:'0' }

            ],
            redirect: false,
            keyword: '',
            menorFiltro: '',
            maiorFiltro: '',
            redirectDetalhe:false,
            menorDesconto: '',
            menorAvaliacao:'',

            produtosBack: [
                { price: '0.0', title: 'mrbrightside', link: "url", image: 'link', pontuacao: '12', desconto: '0' }
            ]

            
        }

        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3000/home', {preferencias: this.state.usuario.preferencias})
            .then(resp => {
                console.log(resp.data)
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)

                    this.setState({ produtos: resp.data })
                    this.setState({ produtosBack: resp.data})

                    return;
                }

                //console.log(resp.data)
            })
            .catch(erro => console.log(erro))

        this.handleChange = this.handleChange.bind(this)
        this.modificaPreferencias = this.modificaPreferencias.bind(this)
        this.busca = this.busca.bind(this)
        this.ordenar = this.ordenar.bind(this)
        this.filtrar = this.filtrar.bind(this)
        this.pegaMaiorPreco = this.pegaMaiorPreco.bind(this)
        this.pegaMenorPreco = this.pegaMenorPreco.bind(this)
        this.detalhes = this.detalhes.bind(this)

        this.pegaMenorDesconto = this.pegaMenorDesconto.bind(this)
        this.pegaAvaliacao = this.pegaAvaliacao.bind(this)
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

    busca() {
        console.log(this.state.usuario.keyword)
        axios.post('http://localhost:3000/busca', { keyword: this.state.usuario.keyword })
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ produtos: resp.data })
                    return;
                }
                //console.log(resp.data)
            })
            .catch(erro => console.log(erro))
    }

    pegaMaiorPreco(event) {
        console.log("MAIOR")
        var maiorPreco = event.target.value

        this.setState({ maiorFiltro: maiorPreco })
    }

    pegaMenorPreco(event) {
        var menorPreco = event.target.value
        

        this.setState({ menorFiltro: menorPreco })
    }

    pegaMenorDesconto(event){
        var menorDesconto = event.target.value
        this.setState({menorDesconto: menorDesconto})
    }

    pegaAvaliacao(event){
        var avaliacao = event.target.value
        this.setState({menorAvaliacao: avaliacao})
    }


    filtrar() {
        var menorPreco = this.state.menorFiltro
        var maiorPreco = this.state.maiorFiltro

        var descontoMinimo = this.state.menorDesconto

        var menorAvaliacao = this.state.menorAvaliacao

        if(menorPreco.length == 0){
            menorPreco = -1
            
        }
        
        if(maiorPreco.length == 0){
            maiorPreco = Infinity
        }

        if (descontoMinimo.length == 0){
            descontoMinimo = -1
        }


        if(menorAvaliacao.length == 0){
            menorAvaliacao = -1
        }else{

            if(menorAvaliacao == 1){
                menorAvaliacao = 100
            } else if(menorAvaliacao == 2){
                menorAvaliacao = 200
            }else if(menorAvaliacao == 3){
                menorAvaliacao = 500
            }else if(menorAvaliacao == 4){
                menorAvaliacao = 700
            }else if(menorAvaliacao == 5){
                menorAvaliacao = 1100
            }
        }

        console.log("AVALIACAO", menorAvaliacao)

        var produtos_atuais = this.state.produtosBack

        function filtra_lista(lista_de_produtos, maior_valor, menor_valor, desconto, avaliacao){
            var i = 0

            var lista_reposta = []
            for (i; i<lista_de_produtos.length; i++){

                if (lista_de_produtos[i].price < maior_valor && lista_de_produtos[i].price > menor_valor && lista_de_produtos[i].desconto > desconto && lista_de_produtos[i].pontuacao > avaliacao){
                    lista_reposta.push(lista_de_produtos[i])
                }
            }

            return lista_reposta
        }


        var produtos_filtrados = filtra_lista(produtos_atuais, maiorPreco, menorPreco, descontoMinimo, menorAvaliacao)
        
        this.setState({produtos: produtos_filtrados})
    }

    detalhes(){
        this.setState({ redirectDetalhe: true })

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
            var idProduto = produto.id

            if (this.state.redirectDetalhe === true) {
                return (
                    <Redirect to={
                        {
                            pathname: '/detalhe/'+idProduto,
                            state: {
                                id: this.state.usuario.id,
                                nome: this.state.usuario.nome,
                                preferencias: this.state.usuario.preferencias,
                            }
                        }
                    }
                    />
                )
            }
            
            
            return (

                
                <li key={produto.title} style={{display:'flex'}} >

                    
                    <br></br>
                            
                            <img src={produto.image} ></img>
                            
                            <br></br>
                        
                            {produto.title}
                            <br></br>
                        
                            Preço: U${produto.price}
                            <br></br>
                        
                            Mais detalhes: {produto.link}
                            <br></br>

                            

                            <button onClick={this.detalhes}>Veja mais detalhes</button>
    
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
                    <h1>
                        Você já tem preferencias
                </h1>


                    <input name="keyword"
                        value={this.state.usuario.keyword}
                        onChange={this.handleChange} />
                    <button onClick={this.busca}>Buscar</button>


                    <div style={{ display: "block" }}>
                        <h2>FILTROS</h2>
                        Preço mínimo: <input onChange={this.pegaMenorPreco} type='text'></input><br></br> 
                        Preço máximo: <input onChange={this.pegaMaiorPreco} type='text'></input><br></br><br></br>

                        Desconto mínimo (%): <input onChange={this.pegaMenorDesconto} type='text'></input><br></br>

                        Avaliação(1-5): <input onChange={this.pegaAvaliacao} type='text'></input>

                        <button onClick={this.filtrar} style={{width:'100px'}}>Filtrar</button>
                    </div>

                    <h2>ORDEM</h2>
                    Ordenar por: <select onChange={this.ordenar} name="options">
                        <option selected >Select</option>
                        <option value='menorPreco'>Menor preço</option>
                        <option value='maiorPreco'>Maior preço</option>
                        <option value='melhorAvaliacao'>Melhores avaliados</option>
                        <option value='maiorDesconto'>Melhores descontos</option>
                    </select>

                    <ul style={{display:'flex', 'flex-wrap': 'wrap', width:'100%'}}> {liProdutos} </ul>
                </div>
            )



        }


    }
}